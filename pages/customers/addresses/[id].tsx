import { GetServerSideProps } from 'next';
import { useQuery } from 'react-query';
import CreateAddress from '../../../components/addresses/CreateAddress';
import Layout from '../../../components/facc/Layout';
import { getAddresses } from '../../../fetch';
import { AddressPageType, AddressType } from '../../../types';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = typeof params.id === 'string' ? params.id : params.id[0];
  const addresses: AddressType[] = await getAddresses(id);
  return { props: { addresses, id } };
};

const Addresses = ({ addresses, id }: AddressPageType) => {
  const { data } = useQuery<AddressType[]>('addresses', {
    initialData: addresses,
  });

  return (
    <>
      <h1 className='H1'>Mes adresses</h1>
      <ul>
        {data.map((address) => (
          <li key={address._id}>{address.name}</li>
        ))}
      </ul>
      <h2>Créer une adresse</h2>
      <CreateAddress id={id} />
    </>
  );
};

export default Addresses;
