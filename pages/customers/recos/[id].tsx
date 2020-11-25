import { GetServerSideProps } from 'next';
import { useQuery } from 'react-query';
import RecoCustomer from '../../../components/recos/RecoCustomer';
import RecoIntro from '../../../components/recos/RecoIntro';
import { getCustomer } from '../../../fetch';
import { CustomerPageType, CustomerType } from '../../../types';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = typeof params.id === 'string' ? params.id : params.id[0];
  const customer: CustomerType = await getCustomer(id);
  return { props: { customer, id } };
};

const Reco = ({ customer, id }: CustomerPageType) => {
  useQuery<CustomerType>('customer', { initialData: customer });

  return (
    <>
      <RecoIntro />
      <RecoCustomer />
    </>
  );
};

export default Reco;
