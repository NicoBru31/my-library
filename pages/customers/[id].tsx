import { GetServerSideProps } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { introReadings } from '../../components/customer/intro';
import Readings from '../../components/readings/Readings';
import Intro from '../../components/utils/Intro';
import Logout from '../../components/utils/Logout';
import { getCustomer } from '../../fetch';
import { absoluteUrl } from '../../fetch/utils';

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

const Customer = () => (
  <div className='bg-books'>
    <Intro {...introReadings} />
    <Readings />
    <div className='flex justify-center py-10'>
      <Logout />
    </div>
  </div>
);

export default Customer;
