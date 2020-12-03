import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import fetch from 'isomorphic-fetch';
import middleware from '../../middleware/database';
import {
  AddressType,
  Incoming,
  RecoBooksType,
  RecoType,
  Response,
} from '../../types';
import { absoluteUrl } from '../../fetch/utils';

const COL = 'recos';
const handler = nextConnect();

handler.use(middleware);

handler.use<Incoming, Response>(async (req, res, next) => {
  if (req.method !== 'POST') return next();
  const reco = JSON.parse(req.body) as RecoType;
  const { type = 'zip' } = reco.from;
  const { origin } = absoluteUrl(req, 'localhost:3000');
  const addresses = await Promise.all<AddressType[]>(
    reco.from.addresses.map((id) =>
      fetch(`${origin}/api/addresses?type=${type}&id=${id}`).then((r) =>
        r.json(),
      ),
    ),
  );
  reco.answers = [...new Set(addresses)].flat(1).map((address) => ({
    books: [],
    message: '',
    sellerId: address.seller[0]._id,
  }));
  req.body = JSON.stringify(reco);
  next();
});

handler.get<Incoming, Response>(async (req, res) => {
  const recos = await req.db
    .collection(COL)
    .find({ isClosed: false, 'answers.sellerId': req.query.fromSeller })
    .toArray();
  res.json(recos);
});

handler.patch<Incoming, Response>(async (req, res) => {
  const { recoId, id } = JSON.parse(req.body);
  console.log(req.body);
  const { upsertedCount } = await req.db
    .collection(COL)
    .updateOne({ _id: new ObjectId(recoId) }, { $addToSet: { notified: id } });
  const { notified } = await req.db
    .collection(COL)
    .findOne<RecoType>(
      { _id: new ObjectId(recoId) },
      { projection: { notified: 1 } },
    );
  res.json({ success: upsertedCount === 1, notified });
});

handler.post<Incoming, Response>(async (req, res) => {
  const reco = JSON.parse(req.body) as RecoType;
  reco.createdAt = new Date();
  reco.isClosed = false;
  reco.notified = [reco.customerId];
  const { insertedId } = await req.db.collection(COL).insertOne(reco);
  req.db
    .collection('customers')
    .updateOne(
      { _id: new ObjectId(reco.customerId) },
      { $addToSet: { recos: new ObjectId(insertedId) } },
    );
  const inserted = await req.db.collection(COL).findOne({
    _id: new ObjectId(insertedId),
  });
  res.json(inserted);
});

handler.put<Incoming, Response>(async (req, res) => {
  const { id } = req.query;
  const reco = JSON.parse(req.body) as RecoBooksType;
  try {
    const { upsertedCount } = await req.db.collection(COL).updateOne(
      {
        _id: new ObjectId(id),
        'answers.sellerId': new ObjectId(reco.sellerId),
      },
      {
        $set: {
          'answers.$.books': reco.books,
          'answers.$.message': reco.message,
        },
        $pull: {
          notified: '$customerId',
        },
      },
    );
    res.json({ success: upsertedCount > 0 });
  } catch (e) {
    console.log(e);
    res.json({ success: false });
  }
});

export default handler;
