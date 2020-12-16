import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import fetch from 'isomorphic-fetch';
import middleware from '../../middleware/database';
import { GoogleBookType, Incoming, Response } from '../../types';
import { absoluteUrl } from '../../fetch/utils';

const handler = nextConnect();

handler.use(middleware);

handler.use(async (req, res, next) => {
  if (!req.query.googleId) return next();
  const url = absoluteUrl(req, 'localhost:3000');
  const googleBook: GoogleBookType = await fetch(
    `${url.origin}/api/google?id=${req.query.googleId}`,
  ).then((r) => r.json());
  if (googleBook) {
    const { insertedId } = await req.db.collection('books').insertOne({
      author: googleBook.volumeInfo.authors.join(', '),
      googleId: req.query.googleId,
      title: googleBook.volumeInfo.title,
    });
    req.query.id = insertedId;
  }
  next();
});

handler.get<Incoming, Response>(async (req, res) => {
  if (req.query.id) {
    const book = await req.db
      .collection('books')
      .findOne({ _id: new ObjectId(req.query.id) });
    return res.json(book);
  } else if (req.query.ids) {
    const books = await req.db
      .collection('books')
      .find({
        _id: { $in: req.query.ids.split(',').map((id) => new ObjectId(id)) },
      })
      .toArray();
    return res.json(books);
  }
  return res.json([]);
});

export default handler;
