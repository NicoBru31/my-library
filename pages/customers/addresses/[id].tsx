import { GetServerSideProps } from 'next';
import { useQuery } from 'react-query';
import AddAddress from '../../../components/addresses/AddAddress';
import AddressGoReco from '../../../components/addresses/AddressGoReco';
import Address from '../../../components/addresses/Address';
import Intro from '../../../components/utils/Intro';
import { getCustomer } from '../../../fetch';
import { absoluteUrl } from '../../../fetch/utils';
import { CustomerPageType, CustomerType } from '../../../types';

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const id = typeof params.id === 'string' ? params.id : params.id[0];
  const url = absoluteUrl(req, 'localhost:3000').origin;
  const customer: CustomerType = await getCustomer(url, id);
  return { props: { customer, id } };
};

const Addresses = ({ customer }: CustomerPageType) => {
  const { data } = useQuery<CustomerType>('customer', {
    initialData: customer,
  });

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
