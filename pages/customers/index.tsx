import { Session, signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CreateCustomer from '../../components/customer/CreateCustomer';

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
      {!session ? <CreateCustomer /> : <div>Loading...</div>}
    </>
  );
};

export default Customer;
