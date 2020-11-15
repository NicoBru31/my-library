import { compareSync } from 'bcryptjs';
import nextConnect from 'next-connect';
import middleware from '../../middleware/database';
import { LoginInterface } from '../login';
import {
  Incoming,
  CustomerType,
  Response,
  SellerType,
} from './../../types/index';

const handler = nextConnect();

handler.use(middleware);

handler.post<Incoming, Response>(async (req, res) => {
  const fromSeller = req.query?.fromSeller === 'true';
  const { email, password } = JSON.parse(req.body) as LoginInterface;
  const customer: CustomerType = await req.db
    .collection(fromSeller ? 'sellers' : 'customers')
    .findOne({ email }, { projection: { _id: 1, hash: 1 } });
  if (!customer || !compareSync(password, customer.hash))
    return res.json({ _id: '' });
  return res.json({ id: customer._id, isCustomer: true });
});

export default handler;
