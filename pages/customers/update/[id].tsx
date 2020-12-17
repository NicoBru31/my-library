import { GetServerSideProps } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import CustomerUpdate from '../../../components/customer/CustomerUpdate';
import Intro from '../../../components/utils/Intro';
import { getCustomer } from '../../../fetch';
import { absoluteUrl } from '../../../fetch/utils';

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

const UpdateCustomer = () => {
  return (
    <div className='home-picture'>
      <Intro
        text='Ces informations restent strictement confidentielles, elles ne sont transmises à personne.'
        title='Modifier mon compte'
      />
      <div className='flex justify-center pb-4'>
        <CustomerUpdate />
      </div>
    </div>
  );
};

export default UpdateCustomer;
