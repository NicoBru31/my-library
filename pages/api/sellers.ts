import { hashSync } from 'bcryptjs';
import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../middleware/database';
import { Incoming, Response, SellerType } from './../../types';

const handler = nextConnect();

handler.use(middleware);

handler.get<Incoming, Response>(async (req, res) => {
  let match = {};
  if (req.query.id) match = { _id: new ObjectId(req.query.id) };
  else if (req.query.ids) {
    const ids = req.query.ids.split(',').map((id) => new ObjectId(id));
    match = { _id: { $in: ids } };
  }
  const agg = await req.db
    .collection('sellers')
    .aggregate([
      { $match: match },
      {
        $lookup: {
          from: 'addresses',
          localField: 'addresses',
          foreignField: '_id',
          as: 'addresses',
        },
      },
    ])
    .toArray();
  if (req.query.id) res.json(agg[0]);
  else res.json(agg);
});

handler.post<Incoming, Response>(async (req, res) => {
  const { addresses, confirm, password, ...body } = JSON.parse(
    req.body,
  ) as SellerType;
  if (password) body.hash = hashSync(password, 10);
  else delete body.hash;
  const inserted = await req.db.collection('sellers').insertOne(body);
  const seller = await req.db
    .collection('sellers')
    .findOne(
      { _id: new ObjectId(inserted.insertedId) },
      { projection: { addresses: 0 } },
    );
  res.json(seller);
});

handler.put<Incoming, Response>(async (req, res) => {
  const { _id, addresses, password, ...body } = JSON.parse(
    req.body,
  ) as SellerType;
  if (password) body.hash = hashSync(password, 10);
  else delete body.hash;
  await req.db
    .collection('sellers')
    .updateOne({ _id: new ObjectId(req.query.id) }, { $set: body });
  const seller = await req.db
    .collection('sellers')
    .findOne(
      { _id: new ObjectId(req.query.id) },
      { projection: { addresses: 0, readings: 0 } },
    );
  res.json(seller);
});

export default handler;
