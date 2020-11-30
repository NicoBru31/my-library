import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import fetch from 'isomorphic-fetch';
import middleware from '../../middleware/database';
import { AddressType, Incoming, RecoType, Response } from '../../types';
import { absoluteUrl } from '../../fetch/utils';

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
    .collection('recos')
    .find({ isClosed: false, 'answers.sellerId': req.query.fromSeller })
    .toArray();
  res.json(recos);
});

handler.post<Incoming, Response>(async (req, res) => {
  const reco = JSON.parse(req.body) as RecoType;
  reco.createdAt = new Date();
  reco.isClosed = false;
  const { insertedId } = await req.db.collection('recos').insertOne(reco);
  req.db
    .collection('customers')
    .updateOne(
      { _id: new ObjectId(reco.customerId) },
      { $addToSet: { recos: new ObjectId(insertedId) } },
    );
  const inserted = await req.db.collection('recos').findOne({
    _id: new ObjectId(insertedId),
  });
  res.json(inserted);
});

handler.put<Incoming, Response>(async (req, res) => {
  const { id } = req.query;
  const reco = JSON.parse(req.body);
  try {
    const { upsertedCount } = await req.db.collection('recos').updateOne(
      {
        _id: new ObjectId(id),
        'answers.sellerId': new ObjectId(reco.sellerId),
      },
      {
        $set: {
          'answers.$.books': reco.books,
          'answers.$.message': reco.message,
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
