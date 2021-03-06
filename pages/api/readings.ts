import nextConnect from 'next-connect';
import { ObjectId } from 'mongodb';
import { BookType, Incoming, Response } from '@/types/index';
import middleware from '../../middleware/database';
import { ReadingType } from '@/types/index';

const handler = nextConnect();

handler.use(middleware);

handler.delete<Incoming, Response>(async (req, res) => {
  const { id } = req.query;
  const { deletedCount } = await req.db
    .collection('readings')
    .deleteOne({ _id: new ObjectId(id) });
  res.json({ id, success: deletedCount === 1 });
});

handler.get<Incoming, Response>(async (req, res) => {
  const ids = req.query.ids.split(',').map((id) => new ObjectId(id));
  const readings = await req.db
    .collection('readings')
    .aggregate([
      { $match: { _id: { $in: ids } } },
      {
        $lookup: {
          from: 'books',
          localField: 'bookId',
          foreignField: '_id',
          as: 'book',
        },
      },
      { $unwind: '$book' },
    ])
    .toArray();
  res.json(readings);
});

handler.post<Incoming, Response>(async (req, res) => {
  const { book, customerId, ...body }: ReadingType = JSON.parse(req.body);
  const found = await req.db
    .collection('books')
    .findOne<BookType>({ _id: new ObjectId(book._id) });
  let bookId;
  if (!found) {
    const { insertedId } = await req.db.collection('books').insertOne(book);
    bookId = insertedId;
  } else bookId = found._id;
  const reading = await req.db
    .collection('readings')
    .insertOne({ ...body, bookId });
  req.db
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

handler.put<Incoming, Response>(async (req, res) => {
  const { _id, ...data } = JSON.parse(req.body) as ReadingType;
  const { id } = req.query;
  await req.db
    .collection('readings')
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
  const reading = await req.db
    .collection('readings')
    .findOne({ _id: new ObjectId(id) });
  res.json(reading);
});

export default handler;
