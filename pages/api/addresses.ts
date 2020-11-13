import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../middleware/database';
import {
  Incoming,
  CustomerType,
  AddressType,
  Response,
} from './../../types/index';

const handler = nextConnect();

handler.use(middleware);

handler.get<Incoming, Response>(async (req, res) => {
  const customer: CustomerType = await req.db
    .collection('customers')
    .findOne(
      { _id: new ObjectId(req.query.id) },
      { projection: { addresses: 1 } },
    );
  const addresses: AddressType[] = await req.db
    .collection('addresses')
    .find({ _id: { $in: customer.addresses } })
    .toArray();
  res.json(addresses);
});

handler.post<Incoming, Response>(async (req, res) => {
  const insert = await req.db
    .collection('addresses')
    .insertOne(JSON.parse(req.body));
  req.db
    .collection('customers')
    .updateOne(
      { _id: new ObjectId(req.query.id) },
      { $addToSet: { addresses: new ObjectId(insert.insertedId) } },
    );
  const address = await req.db.collection('addresses').findOne({
    _id: new ObjectId(insert.insertedId),
  });
  res.json(address);
});

export default handler;
