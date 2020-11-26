import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useQuery } from 'react-query';
import SellerUpdate from '../../../components/sellers/SellerUpdate';
import { getSeller } from '../../../fetch';
import { absoluteUrl } from '../../../fetch/utils';
import { SellerType } from '../../../types';
import { SellerPageType } from '../../../types/index';

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const id = typeof params.id === 'string' ? params.id : params.id[0];
  const seller: SellerType = await getSeller(
    absoluteUrl(req, 'localhost:3000').origin,
    id,
  );
  return { props: { seller, id } };
};

const UpdateSeller = ({ id, seller }: SellerPageType) => {
  const { data } = useQuery<SellerType>('seller', {
    initialData: seller,
  });

  return (
    <>
      <h1 className='H1'>{`Hello ${data.name} !`}</h1>
      <Link href={`/sellers/${id}`}>
        <div className='Link'>Retour</div>
      </Link>
      <SellerUpdate />
    </>
  );
};

export default UpdateSeller;
