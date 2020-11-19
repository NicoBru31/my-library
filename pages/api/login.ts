import { compareSync } from 'bcryptjs';
import nextConnect from 'next-connect';
import middleware from '../../middleware/database';
import { LoginInterface } from '../login';
import { Incoming, Response } from './../../types/index';

const handler = nextConnect();

handler.use(middleware);

handler.post<Incoming, Response>(async (req, res) => {
  const fromSeller = req.query?.fromSeller === 'true';
  const { email, password } = JSON.parse(req.body) as LoginInterface;
  const data = await req.db
    .collection(fromSeller ? 'sellers' : 'customers')
    .findOne(
      { email },
      { projection: { _id: 1, hash: 1, firstName: 1, lastName: 1, name: 1 } },
    );
  if (!data || !compareSync(password, data.hash)) return res.json({ _id: '' });
  return res.json({
    id: data._id,
    isCustomer: !fromSeller,
    fullName: data.name || `${data.firstName} ${data.lastName}`,
  });
});

export default handler;
