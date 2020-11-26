import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../middleware/database';
import { Incoming, RecoType, Response } from '../../types';

const handler = nextConnect();

handler.use(middleware);

handler.get<Incoming, Response>(async (req, res) => {
  const recos = await req.db
    .collection('recos')
    .find({ isClosed: false })
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
      { $set: { 'answers.$.books': reco.books } },
    );
    res.json({ success: upsertedCount > 0 });
  } catch (e) {
    console.log(e);
    res.json({ success: false });
  }
});

export default handler;
