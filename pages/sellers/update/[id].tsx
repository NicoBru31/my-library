import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import SellerUpdate from '../../../components/sellers/SellerUpdate';
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

const UpdateSeller = () => {
  const { data } = useQuery<SellerType>('seller');

  return (
    <>
      <h1 className='H1'>{`Hello ${data.name} !`}</h1>
      <Link href={`/sellers/${data._id}`}>
        <div className='Link'>Retour</div>
      </Link>
      <SellerUpdate />
    </>
  );
};

export default UpdateSeller;
