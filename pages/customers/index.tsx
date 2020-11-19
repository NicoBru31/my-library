import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import CreateCustomer from '../../components/customer/CreateCustomer';
import LoaderContext from '../../contexts/LoaderContext';
import useSession from '../../hooks/useSession';

const Customer = () => {
  const session = useSession();
  const { push } = useRouter();
  const { setLoader } = useContext(LoaderContext);

  const connect = () => push({ pathname: '/login' });

  useEffect(() => {
    if (session?.isCustomer) {
      setLoader({ isLoading: true });
      push({ pathname: `/customers/${session.id}` });
    }
  }, [session]);

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
