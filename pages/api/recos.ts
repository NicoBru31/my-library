import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../middleware/database';
import { Incoming, RecoType, Response } from '../../types';

const handler = nextConnect();

handler.use(middleware);

handler.post<Incoming, Response>(async (req, res) => {
  const reco = JSON.parse(req.body) as RecoType;
  reco.createdAt = new Date();
  reco.isClosed = false;
  const { insertedId } = await req.db.collection('recos').insertOne(reco);
  const inserted = await req.db.collection('recos').findOne({
    _id: new ObjectId(insertedId),
  });
  req.db
    .collection('customers')
    .updateOne(
      { _id: new ObjectId(reco.customerId) },
      { $addToSet: { recos: new ObjectId(insertedId) } },
    );
  res.json(inserted);
});

export default handler;
