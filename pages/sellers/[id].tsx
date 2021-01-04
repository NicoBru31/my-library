import { Button } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useContext } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import SellerRecos from '../../components/sellers/SellerRecos';
import SessionContext from '../../contexts/SessionContext';
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
  const bookIds = recos.reduce<string[]>(
    (ids, reco) => [
      ...ids,
      ...(reco.answers?.map(({ books }) => books) || []).flat(1),
    ],
    [],
  );
  await Promise.all([
    queryClient.prefetchQuery('seller', () => getSeller(url, id)),
    queryClient.prefetchQuery('recos', () => recos),
    queryClient.prefetchQuery('readings', () => getReadings(url, readingIds)),
    queryClient.prefetchQuery('books', () => getBooks(url, bookIds)),
  ]);
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const Seller = () => {
  const { data } = useQuery<SellerType>('seller');
  const { setSession } = useContext(SessionContext);

  const logout = () => setSession({ id: '' });

  return (
    <>
      <h1 className='H1'>{`Bonjour ${data.name} !`}</h1>
      <SellerRecos />
      <Button colorScheme='teal' onClick={logout}>
        Me déconnecter
      </Button>
    </>
  );
};

export default Seller;
