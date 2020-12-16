import { GetServerSideProps } from 'next';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import AddAddress from '../../../components/addresses/AddAddress';
import Address from '../../../components/addresses/Address';
import AddressGoReco from '../../../components/addresses/AddressGoReco';
import Intro from '../../../components/utils/Intro';
import { getCustomer } from '../../../fetch';
import { absoluteUrl } from '../../../fetch/utils';
import { CustomerType } from '../../../types';

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

const Addresses = () => {
  const { data } = useQuery<CustomerType>('customer');

  return (
    <div className='bg-book'>
      <Intro
        text='Les adresses servent à retrouver les libraires proche de chez vous.'
        title='Mes adresses'
      />
      <div className='md:grid grid-cols-3 items-center flex-wrap'>
        <AddAddress />
        {data?.addresses.map((address) => (
          <Address {...address} key={address._id} />
        ))}
        <AddressGoReco />
      </div>
    </div>
  );
};

export default Addresses;
