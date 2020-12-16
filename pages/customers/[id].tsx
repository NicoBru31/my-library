import { Button } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useContext } from 'react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { introReadings } from '../../components/customer/intro';
import Readings from '../../components/readings/Readings';
import Intro from '../../components/utils/Intro';
import SessionContext from '../../contexts/SessionContext';
import { getCustomer } from '../../fetch';
import { absoluteUrl } from '../../fetch/utils';
import useRouting from '../../hooks/useRouting';

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const queryClient = new QueryClient();
  const id = typeof params.id === 'string' ? params.id : params.id[0];
  const url = absoluteUrl(req, 'localhost:3000').origin;
  await queryClient.prefetchQuery('customer', () => getCustomer(url, id));
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const Customer = () => {
  const { setSession } = useContext(SessionContext);
  const { goLogin } = useRouting();

  const logout = () => {
    setSession({ id: '' });
    goLogin();
  };

  return (
    <div className='bg-books'>
      <Intro {...introReadings} />
      <Readings />
      <div className='flex justify-center py-10'>
        <Button colorScheme='teal' onClick={logout}>
          Me déconnecter
        </Button>
      </div>
    </div>
  );
};

export default Customer;
