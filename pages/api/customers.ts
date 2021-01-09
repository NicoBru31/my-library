import { hashSync } from 'bcryptjs';
import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../middleware/database';
import { CustomerType, Incoming, Response } from '@/types/index';

const handler = nextConnect();

handler.use(middleware);

handler.get<Incoming, Response>(async (req, res) => {
  const agg = await req.db.collection('customers').aggregate<CustomerType>([
    { $match: { _id: new ObjectId(req.query.id) } },
    {
      $lookup: {
        from: 'addresses',
        localField: 'addresses',
        foreignField: '_id',
        as: 'addresses',
      },
    },
    {
      $lookup: {
        from: 'readings',
        localField: 'readings',
        foreignField: '_id',
        as: 'readings',
      },
    },
    {
      $lookup: {
        from: 'recos',
        localField: 'recos',
        foreignField: '_id',
        as: 'recos',
      },
    },
  ]);
  const customer = await agg.next();
  res.json(customer);
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
