import { GetServerSideProps } from 'next';
import { useQuery } from 'react-query';
import CustomerUpdate from '../../../components/customer/CustomerUpdate';
import Intro from '../../../components/utils/Intro';
import { getCustomer } from '../../../fetch';
import { absoluteUrl } from '../../../fetch/utils';
import { CustomerType } from '../../../types';
import { CustomerPageType } from '../../../types/index';

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const id = typeof params.id === 'string' ? params.id : params.id[0];
  const url = absoluteUrl(req, 'localhost:3000').origin;
  const customer: CustomerType = await getCustomer(url, id);
  return { props: { customer, id } };
};

const UpdateCustomer = ({ customer }: CustomerPageType) => {
  useQuery<CustomerType>('customer', getCustomer, {
    initialData: customer,
  });

  return (
    <div className='home-picture'>
      <Intro
        text='Ces informations restent strictement confidentielles, elles ne sont transmises à personne.'
        title='Modifier mon compte'
      />
      <div className='flex justify-center'>
        <CustomerUpdate />
      </div>
    </div>
  );
};

export default UpdateCustomer;
