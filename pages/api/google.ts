import nextConnect from 'next-connect';
import { Incoming, Response } from '@/types/index';
import { queryAdapter } from '../../utils';

const { BOOKS_KEY } = process.env;
const BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

const handler = nextConnect();

handler.get<Incoming, Response>(async (req, res) => {
  const books = await fetch(
    `${BOOKS_API}${
      req.query.id ? `/${req.query.id}?` : queryAdapter(req.query)
    }key=${BOOKS_KEY}&printType=books&langRestrict=fr&projection=lite`,
  ).then((r) => r.json());
  res.json(books.items || books);
});

export default handler;
