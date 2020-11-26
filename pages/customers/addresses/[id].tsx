import { GetServerSideProps } from 'next';
import { useQuery } from 'react-query';
import AddAddress from '../../../components/addresses/AddAddress';
import Address from '../../../components/addresses/Address';
import CreateAddress from '../../../components/addresses/CreateAddress';
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

const Addresses = ({ customer, id }: CustomerPageType) => {
  const { data } = useQuery<CustomerType>('customer', {
    initialData: customer,
  });

  return (
    <>
      <h1 className='H1'>Mes adresses</h1>
      <div className='flex justify-start flex-wrap'>
        <AddAddress />
        {data?.addresses.map((address) => (
          <Address {...address} key={address._id} />
        ))}
      </div>
    </>
  );
};

export default Addresses;
