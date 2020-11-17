import { useRouter } from 'next/router';
import CreateCustomer from '../../components/customer/CreateCustomer';
import useSession from '../../hooks/useSession';

const Customer = () => {
  const session = useSession();
  const router = useRouter();

  const connect = () => router.push({ pathname: '/login' });

  return (
    <>
      <button className='Button' onClick={connect}>
        Se connecter
      </button>
      {!session?.id && <CreateCustomer />}
    </>
  );
};

export default Customer;
