import { GetServerSideProps } from 'next';
import { useQuery } from 'react-query';
import CustomerUpdate from '../../../components/customer/CustomerUpdate';
import { getCustomer } from '../../../fetch';
import { CustomerType } from '../../../types';
import { CustomerPageType } from '../../../types/index';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = typeof params.id === 'string' ? params.id : params.id[0];
  const customer: CustomerType = await getCustomer(id);
  return { props: { customer, id } };
};

const UpdateCustomer = ({ customer }: CustomerPageType) => {
  const { data } = useQuery<CustomerType>('customer', getCustomer, {
    initialData: customer,
  });

  return (
    <>
      <h1 className='H1'>{`Hello ${data.firstName} !`}</h1>
      <CustomerUpdate />
    </>
  );
};

export default UpdateCustomer;
