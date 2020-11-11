import { GetServerSideProps } from 'next';
import { useQuery } from 'react-query';
import { CustomerPageType } from '../../../types/index';
import { getCustomer } from '../../../fetch';
import { CustomerType } from '../../../types';
import Layout from '../../../components/facc/Layout';
import CustomerUpdate from '../../../components/customer/CustomerUpdate';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = typeof params.id === 'string' ? params.id : params.id[0];
  const customer: CustomerType = await getCustomer(id);
  return { props: { customer, id } };
};

const UpdateCustomer = ({ customer, id }: CustomerPageType) => {
  const { data } = useQuery<CustomerType>('customer', getCustomer, {
    initialData: customer,
  });

  return (
    <>
      <h1 className='H1'>{`Hello ${data.firstName} !`}</h1>
      <Link href={`/customers/${id}`}>Consulter mes lectures</Link>
      <CustomerUpdate />
    </>
  );
};

export default UpdateCustomer;
