import { Button } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import CreateReading from '../../components/readings/CreateReading';
import Reading from '../../components/readings/Reading';
import SessionContext from '../../contexts/SessionContext';
import { getCustomer } from '../../fetch';
import { CustomerPageType, CustomerType } from '../../types';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = typeof params.id === 'string' ? params.id : params.id[0];
  const customer: CustomerType = await getCustomer(id);
  return { props: { customer, id } };
};

const Customer = ({ customer, id }: CustomerPageType) => {
  const { data } = useQuery('customer', { initialData: customer });
  const { setSession } = useContext(SessionContext);
  const { push } = useRouter();

  const logout = () => {
    setSession({ id: '' });
    push({ pathname: '/login' });
  };

  return (
    <>
      <h1 className='H1'>{`Bonjour ${data.firstName} !`}</h1>
      {data?.readings.length > 0 && <div>Mes lectures :</div>}
      <div className='flex justify-between items-center flex-wrap'>
        {data.readings.map((reading) => (
          <Reading {...reading} key={reading._id} />
        ))}
      </div>
      <CreateReading id={id} />
      <Button colorScheme='teal' onClick={logout}>
        Me déconnecter
      </Button>
    </>
  );
};

export default Customer;
