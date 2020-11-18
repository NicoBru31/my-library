import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import CreateCustomer from '../../components/customer/CreateCustomer';
import useSession from '../../hooks/useSession';

const Customer = () => {
  const session = useSession();
  const router = useRouter();

  const connect = () => router.push({ pathname: '/login' });

  return (
    <>
      <Button colorScheme='teal' onClick={connect}>
        Se connecter
      </Button>
      {!session?.id && <CreateCustomer />}
    </>
  );
};

export default Customer;
