import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';
import CreateSeller from '../../components/sellers/CreateSeller';
import useSession from '../../hooks/useSession';

const Seller = () => {
  const session = useSession();
  const router = useRouter();

  const connect = () =>
    router.push({ pathname: '/login', search: 'isSeller=true' });

  return (
    <>
      <Button colorScheme='teal' onClick={connect}>
        Se connecter
      </Button>
      {!session?.id && <CreateSeller />}
    </>
  );
};

export default Seller;
