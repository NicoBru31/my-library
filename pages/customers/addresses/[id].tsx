import { GetServerSideProps } from 'next';
import { useQuery } from 'react-query';
import Address from '../../../components/addresses/Address';
import CreateAddress from '../../../components/addresses/CreateAddress';
import { getCustomer } from '../../../fetch';
import { CustomerPageType, CustomerType } from '../../../types';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = typeof params.id === 'string' ? params.id : params.id[0];
  const customer: CustomerType = await getCustomer(id);
  return { props: { customer, id } };
};

const Addresses = ({ customer, id }: CustomerPageType) => {
  const { data } = useQuery<CustomerType>('customer', {
    initialData: customer,
  });

  return (
    <>
      <h1 className='H1'>Mes adresses</h1>
      <ul>
        {data?.addresses.map((address) => (
          <Address {...address} isCustomerAddress key={address._id} />
        ))}
      </ul>
      <h2>Créer une adresse</h2>
      <CreateAddress id={id} />
    </>
  );
};

export default Addresses;
