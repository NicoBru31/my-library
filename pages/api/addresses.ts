import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../middleware/database';
import { AddressType, Incoming, Response } from './../../types/index';

const handler = nextConnect();

handler.use(middleware);

handler.get<Incoming, Response>(async (req, res) => {
  const { type, id } = req.query;
  const field = type === 'city' ? 'city' : 'zip';
  const address = await req.db
    .collection('addresses')
    .findOne<AddressType>(
      { _id: new ObjectId(id) },
      { projection: { [field]: 1 } },
    );
  let where = {};
  if (type === 'city') where = { [field]: address[field] };
  else if (type === 'department') where = { [field]: address[field] };
  else where = { [field]: { $regex: `^${address[field]}` } };
  try {
    const addresses = await req.db
      .collection('addresses')
      .aggregate([
        {
          $lookup: {
            from: 'sellers',
            localField: '_id',
            foreignField: 'addresses',
            as: 'seller',
          },
        },
        { $match: { ...where, seller: { $size: 1 } } },
      ])
      .next();
    res.json(addresses || []);
  } catch (e) {
    console.log(e);
    res.json([]);
  }
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
  const { id } = req.query;
  const { _id, ...body } = JSON.parse(req.body) as AddressType;
  await req.db
    .collection('addresses')
    .updateOne({ _id: new ObjectId(id) }, { $set: body });
  const address = await req.db
    .collection('addresses')
    .findOne({ _id: new ObjectId(id) });
  res.json(address);
});

handler.delete<Incoming, Response>(async (req, res) => {
  const { id } = req.query;
  const { deletedCount } = await req.db
    .collection('addresses')
    .deleteOne({ _id: new ObjectId(id) });
  res.json({ id, success: deletedCount === 1 });
});

export default handler;
