import { GetServerSideProps } from 'next';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import SellerRecos from '../../components/sellers/SellerRecos';
import { getBooks, getReadings, getRecos, getSeller } from '../../fetch';
import { absoluteUrl } from '../../fetch/utils';
import { SellerType } from '../../types';

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const queryClient = new QueryClient();
  const id = typeof params.id === 'string' ? params.id : params.id[0];
  const url = absoluteUrl(req, 'localhost:3000').origin;
  const recos = await getRecos(url, id);
  const readingIds = recos.map((reco) => reco.from?.readings || []).flat(1);
  const readings = await getReadings(url, readingIds);
  const bookIds = recos.reduce<string[]>(
    (ids, reco) => [
      ...ids,
      ...(reco.answers?.map(({ books }) => books) || []).flat(1),
    ],
    readings.map(({ bookId }) => bookId),
  );
  await Promise.all([
    queryClient.prefetchQuery('seller', () => getSeller(url, id)),
    queryClient.prefetchQuery('recos', () => recos),
    queryClient.prefetchQuery('readings', () => readings),
    queryClient.prefetchQuery('books', () => getBooks(url, bookIds)),
  ]);
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const Seller = () => {
  const { data } = useQuery<SellerType>('seller');

  return (
    <>
      <h1 className='H1'>{`Bonjour ${data.name} !`}</h1>
      <SellerRecos />
    </>
  );
};

export default Seller;
