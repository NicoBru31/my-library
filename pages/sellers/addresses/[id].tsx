import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useQuery } from 'react-query';
import Address from '../../../components/addresses/Address';
import CreateAddress from '../../../components/addresses/CreateAddress';
import { getAddresses } from '../../../fetch';
import { AddressPageType, AddressType } from '../../../types';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = typeof params.id === 'string' ? params.id : params.id[0];
  const addresses: AddressType[] = await getAddresses(id, true);
  return { props: { addresses, id } };
};

const Addresses = ({ addresses, id }: AddressPageType) => {
  const { data } = useQuery<AddressType>('address', {
    initialData: addresses[0],
  });

  return (
    <>
      <h1 className='H1'>Mon adresse</h1>
      <Link href={`/sellers/${id}`}>
        <div className='Link'>Retour</div>
      </Link>
      {data?._id ? (
        <Address {...data} key={data._id} />
      ) : (
        <>
          <h2>Créer une adresse</h2>
          <CreateAddress fromSeller id={id} />
        </>
      )}
    </>
  );
};

export default Addresses;
