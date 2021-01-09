import { BookType, GoogleBookType } from @/types/books';
import { Incoming, Response } from @/types/calls';
import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.post<Incoming, Response>(async (req, res) => {
  const googleBook: GoogleBookType = JSON.parse(req.body);
  const book: BookType = {
    author: googleBook.volumeInfo.authors.join(', '),
    googleId: googleBook.id,
    title: googleBook.volumeInfo.title,
  };
  await req.db
    .collection('books')
    .updateOne(book, { $set: book }, { upsert: true });
  const inserted = await req.db
    .collection('books')
    .findOne({ googleId: book.googleId });
  res.json(inserted);
});

export default handler;
