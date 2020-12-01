import { GetServerSideProps } from 'next';
import { useQuery } from 'react-query';
import RecoCustomer from '../../../components/recos/RecoCustomer';
import RecoIntro from '../../../components/recos/RecoIntro';
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

const Reco = ({ customer }: CustomerPageType) => {
  useQuery<CustomerType>('customer', { initialData: customer });

  return (
    <div className='bg-books px-4'>
      <RecoIntro />
      <RecoCustomer />
    </div>
  );
};

export default Reco;
