import { Button } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import AddReading from '../../components/readings/AddReading';
import Reading from '../../components/readings/Reading';
import SessionContext from '../../contexts/SessionContext';
import { getCustomer } from '../../fetch';
import { absoluteUrl } from '../../fetch/utils';
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
  const { data } = useQuery('customer', { initialData: customer });
  const { setSession } = useContext(SessionContext);
  const { push } = useRouter();

  const logout = () => {
    setSession({ id: '' });
    push({ pathname: '/login' });
  };

  return (
    <>
      <h1 className='H1'>{`Bonjour ${data.firstName}, voici vos lectures :`}</h1>
      <div className='flex justify-start items-center flex-wrap'>
        <AddReading />
        {data?.readings?.map((reading) => (
          <Reading {...reading} key={reading._id} />
        ))}
      </div>
      <div className='flex justify-center'>
        <Button colorScheme='teal' onClick={logout}>
          Me déconnecter
        </Button>
      </div>
    </>
  );
};

export default Customer;
