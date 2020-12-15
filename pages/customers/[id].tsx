import { Button } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { introReadings } from '../../components/customer/intro';
import Readings from '../../components/readings/Readings';
import Intro from '../../components/utils/Intro';
import SessionContext from '../../contexts/SessionContext';
import { getCustomer } from '../../fetch';
import { absoluteUrl } from '../../fetch/utils';
import useRouting from '../../hooks/useRouting';
import { CustomerPageType, CustomerType } from '../../types';

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const id = typeof params.id === 'string' ? params.id : params.id[0];
  const url = absoluteUrl(req, 'localhost:3000').origin;
  const customer: CustomerType = await getCustomer(url, id);
  return { props: { customer, id } };
};

const Customer = ({ customer }: CustomerPageType) => {
  useQuery('customer', { initialData: customer });
  const { setSession } = useContext(SessionContext);
  const { goLogin } = useRouting();

  const logout = () => {
    setSession({ id: '' });
    goLogin();
  };

  return (
    <div className='bg-books'>
      <Intro {...introReadings} />
      <Readings />
      <div className='flex justify-center my-10'>
        <Button colorScheme='teal' onClick={logout}>
          Me déconnecter
        </Button>
      </div>
    </div>
  );
};

export default Customer;
