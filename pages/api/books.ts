import nextConnect from 'next-connect';
import fetch from 'isomorphic-fetch';
import { Incoming, Response } from '../../types';
const { BOOKS_API } = process.env;

const handler = nextConnect();

handler.get<Incoming, Response>(async (req, res) => {
  console.log(req.query);
  const books = await fetch(`${BOOKS_API}${req.query}`).then((r) => r.json());
  console.log('books', books);
  res.json(books);
});

export default handler;
