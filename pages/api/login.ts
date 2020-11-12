import { compareSync } from 'bcryptjs';
import nextConnect from 'next-connect';
import middleware from '../../middleware/database';
import { LoginInterface } from '../login';
import { Incoming, CustomerType, Response } from './../../types/index';

const handler = nextConnect();

handler.use(middleware);

handler.post<Incoming, Response>(async (req, res) => {
  const { email, password } = JSON.parse(req.body) as LoginInterface;
  const customer: CustomerType = await req.db
    .collection('customers')
    .findOne({ email }, { projection: { _id: 1, hash: 1 } });
  if (!customer) return res.json({ _id: '' });
  if (!compareSync(password, customer.hash)) return res.json({ _id: '' });
  return res.json({ id: customer._id });
});

export default handler;
