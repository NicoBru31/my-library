import { GetServerSideProps } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import RecoCustomer from '../../../components/recos/RecoCustomer';
import RecoIntro from '../../../components/recos/RecoIntro';
import { getBooks, getCustomer, getReadings, getSellers } from '../../../fetch';
import { absoluteUrl } from '../../../fetch/utils';

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const queryClient = new QueryClient();
  const id = typeof params.id === 'string' ? params.id : params.id[0];
  const url = absoluteUrl(req, 'localhost:3000').origin;
  const customer = await getCustomer(url, id);
  const sellerIds = customer.recos
    .map((reco) => reco.answers.map((answer) => answer.sellerId))
    .flat(1);
  const readingIds = [
    ...customer.recos
      .map((reco) => reco.from?.readings)
      .flat(1)
      .filter((id) => id),
    ...customer.readings.map(({ _id }) => _id),
  ];
  const readings = await getReadings(url, readingIds);
  const bookIds = [
    ...customer.recos
      .map((reco) => reco.answers.map((answer) => answer.books))
      .flat(2),
    ...readings.map(({ bookId }) => bookId),
  ];
  await Promise.all([
    queryClient.prefetchQuery('customer', () => customer),
    queryClient.prefetchQuery('books', () => getBooks(url, bookIds)),
    queryClient.prefetchQuery('sellers', () => getSellers(url, sellerIds)),
    queryClient.prefetchQuery('readings', () => readings),
  ]);
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const Reco = () => (
  <div className='bg-books'>
    <RecoIntro />
    <RecoCustomer />
  </div>
);

export default Reco;
