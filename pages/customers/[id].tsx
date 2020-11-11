import { GetServerSideProps } from 'next';
import { signOut } from 'next-auth/client';
import Link from 'next/link';
import { useQuery } from 'react-query';
import Layout from '../../components/facc/Layout';
import CreateReading from '../../components/readings/CreateReading';
import Reading from '../../components/readings/Reading';
import { getCustomer } from '../../fetch';
import { CustomerPageType, CustomerType } from '../../types';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = typeof params.id === 'string' ? params.id : params.id[0];
  const customer: CustomerType = await getCustomer(id);
  return { props: { customer, id } };
};

const Customer = ({ customer, id }: CustomerPageType) => {
  const { data } = useQuery('customer', { initialData: customer });
  return (
    <>
      <h1 className='H1'>{`Bonjour ${data.firstName} !`}</h1>
      <Link href={`/customers/update/${id}`}>
        <div className='Link'>Modifier mon compte</div>
      </Link>
      <Link href={`/customers/addresses/${id}`}>
        <div className='Link'>Voir mes adresses</div>
      </Link>
      <div>Mes lectures :</div>
      <ul>
        {data.readings.map((reading) => (
          <Reading {...reading} key={reading._id} />
        ))}
      </ul>
      <CreateReading id={id} />
      <button onClick={() => signOut()}>Me déconnecter</button>
    </>
  );
};

export default Customer;
