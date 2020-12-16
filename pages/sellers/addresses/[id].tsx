import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import AddAddress from '../../../components/addresses/AddAddress';
import Address from '../../../components/addresses/Address';
import { getSeller } from '../../../fetch';
import { absoluteUrl } from '../../../fetch/utils';
import { SellerType } from '../../../types';

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const queryClient = new QueryClient();
  const id = typeof params.id === 'string' ? params.id : params.id[0];
  const url = absoluteUrl(req, 'localhost:3000').origin;
  await queryClient.prefetchQuery('seller', () => getSeller(url, id));
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const Addresses = () => {
  const { data } = useQuery<SellerType>('sellers');

  return (
    <>
      <h1 className='H1'>Mon adresse</h1>
      <Link href={`/sellers/${data._id}`}>
        <div className='Link'>Retour</div>
      </Link>
      {data?.addresses[0] ? (
        <Address {...data.addresses[0]} />
      ) : (
        <>
          <h2>Créer une adresse</h2>
          <AddAddress />
        </>
      )}
    </>
  );
};

export default Addresses;
