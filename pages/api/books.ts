import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../middleware/database';
import { Incoming, Response } from '../../types';

const handler = nextConnect();

handler.use(middleware);

handler.get<Incoming, Response>(async (req, res) => {
  const book = await req.db
    .collection('books')
    .findOne({ _id: new ObjectId(req.query.id) });
  res.json(book);
});

export default handler;
