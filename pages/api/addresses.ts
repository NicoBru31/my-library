import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../middleware/database';
import {
  Incoming,
  CustomerType,
  AddressType,
  Response,
  SellerType,
} from './../../types/index';

const handler = nextConnect();

handler.use(middleware);

handler.get<Incoming, Response>(async (req, res) => {
  const fromSeller = req.query.fromSeller === 'true';
  const data: CustomerType | SellerType = await req.db
    .collection(fromSeller ? 'sellers' : 'customers')
    .findOne(
      { _id: new ObjectId(req.query.id) },
      { projection: { addresses: 1 } },
    );
  if (!data.addresses) return res.json([]);
  const addresses: AddressType[] = await req.db
    .collection('addresses')
    .find({ _id: { $in: data.addresses } })
    .toArray();
  res.json(addresses);
});

handler.post<Incoming, Response>(async (req, res) => {
  const fromSeller = req.query?.fromSeller === 'true';
  const insert = await req.db
    .collection('addresses')
    .insertOne(JSON.parse(req.body));
  req.db
    .collection(fromSeller ? 'sellers' : 'customers')
    .updateOne(
      { _id: new ObjectId(req.query.id) },
      { $addToSet: { addresses: new ObjectId(insert.insertedId) } },
    );
  const address = await req.db.collection('addresses').findOne({
    _id: new ObjectId(insert.insertedId),
  });
  res.json(address);
});

handler.put<Incoming, Response>(async (req, res) => {
  const id = req.query.id;
  const { _id, ...body } = JSON.parse(req.body) as AddressType;
  await req.db
    .collection('addresses')
    .updateOne({ _id: new ObjectId(id) }, { $set: body });
  const address = await req.db
    .collection('addresses')
    .findOne({ _id: new ObjectId(id) });
  res.json(address);
});

export default handler;
