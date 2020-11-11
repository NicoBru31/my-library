import nextConnect from 'next-connect';
import { compareSync } from 'bcryptjs';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import middleware from '../../../middleware/database';
import { CustomerType, Incoming } from '../../../types';

const options = (req: Incoming) => ({
  providers: [
    Providers.Credentials({
      name: 'my account',
      credentials: {
        email: { label: 'E-mail', type: 'email', placeholder: 'toto@to.to' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async ({ email, password }) => {
        const user: CustomerType = await req.db
          .collection('customers')
          .findOne({ email: email });
        const checkPassword = compareSync(password, user.hash);
        return Promise.resolve(checkPassword ? user : null);
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    session: async (session) => {
      const customer: CustomerType = await req.db
        .collection('customers')
        .findOne({ email: session.user.email }, { projection: { _id: 1 } });
      return {
        ...session,
        id: customer._id,
      };
    },
  },
  database:
    'mongodb+srv://dbAdmin:V4YXFA7bMongo@alexandria.zykes.mongodb.net/stagin?retryWrites=true&w=majority',
});

const handler = nextConnect();
handler.use(middleware);
handler.use((req, res) => NextAuth(req, res, options(req)));

export default handler;
