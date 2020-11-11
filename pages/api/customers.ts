import { ObjectId } from 'mongodb';
import { hashSync } from 'bcryptjs';
import nextConnect from 'next-connect';
import middleware from '../../middleware/database';
import {
  Incoming,
  CustomerType,
  ReadingType,
  Response,
} from './../../types/index';

const handler = nextConnect();

handler.use(middleware);

handler.get<Incoming, Response>(async (req, res) => {
  const customer: CustomerType = await req.db.collection('customers').findOne({
    _id: new ObjectId(req.query.id),
  });
  const readings: ReadingType[] = await req.db
    .collection('readings')
    .find({ _id: { $in: customer.readings } })
    .toArray();
  res.json({
    ...customer,
    readings,
  });
});

handler.post<Incoming, Response>(async (req, res) => {
  const { addresses, confirm, password, readings, ...body } = JSON.parse(
    req.body,
  ) as CustomerType;
  if (password) body.hash = hashSync(password, 10);
  else delete body.hash;
  const inserted = await req.db.collection('customers').insertOne(body);
  const customer = await req.db
    .collection('customers')
    .findOne(
      { _id: new ObjectId(inserted.insertedId) },
      { projection: { addresses: 0, readings: 0 } },
    );
  res.json(customer);
});

handler.put<Incoming, Response>(async (req, res) => {
  const { _id, addresses, password, readings, ...body } = JSON.parse(
    req.body,
  ) as CustomerType;
  if (password) body.hash = hashSync(password, 10);
  else delete body.hash;
  await req.db
    .collection('customers')
    .updateOne({ _id: new ObjectId(req.query.id) }, { $set: body });
  const customer = await req.db
    .collection('customers')
    .findOne(
      { _id: new ObjectId(req.query.id) },
      { projection: { addresses: 0, readings: 0 } },
    );
  res.json(customer);
});

export default handler;
