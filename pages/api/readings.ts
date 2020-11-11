import nextConnect from 'next-connect';
import { ObjectId } from 'mongodb';
import { Incoming, Response } from '../../types/index';
import middleware from '../../middleware/database';
import { ReadingType } from '../../types';

const handler = nextConnect();

handler.use(middleware);

handler.post<Incoming, Response>(async (req, res) => {
  const {
    customerId,
    ...body
  }: ReadingType & { customerId: string } = JSON.parse(req.body);
  const reading = await req.db.collection('readings').insertOne(body);
  await req.db
    .collection('customers')
    .updateOne(
      { _id: new ObjectId(customerId) },
      { $addToSet: { readings: new ObjectId(reading.insertedId) } },
    );
  const inserted = await req.db
    .collection('readings')
    .findOne({ _id: new ObjectId(reading.insertedId) });
  res.json(inserted);
});

export default handler;
