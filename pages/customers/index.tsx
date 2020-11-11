import { Session, signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CreateCustomer from '../../components/customer/CreateCustomer';
import Layout from '../../components/facc/Layout';

interface LocalSession extends Session {
  id?: string;
}

const Customer = () => {
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    const id = (session as LocalSession)?.id;
    if (id) router.push({ pathname: `/customers/${id}` });
  }, [session]);

  return (
    <>
      <button onClick={() => signIn()}>Se connecter</button>
      <CreateCustomer />
    </>
  );
};

export default Customer;
