import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useQuery } from 'react-query';
import Address from '../../../components/addresses/Address';
import CreateAddress from '../../../components/addresses/CreateAddress';
import { getSeller } from '../../../fetch';
import { absoluteUrl } from '../../../fetch/utils';
import { SellerPageType, SellerType } from '../../../types';

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const id = typeof params.id === 'string' ? params.id : params.id[0];
  const seller: SellerType = await getSeller(
    absoluteUrl(req, 'localhost:3000').origin,
    id,
  );
  return { props: { addresses: seller.addresses, id } };
};

const Addresses = ({ seller, id }: SellerPageType) => {
  const { data } = useQuery<SellerType>('sellers', { initialData: seller });

  return (
    <>
      <h1 className='H1'>Mon adresse</h1>
      <Link href={`/sellers/${id}`}>
        <div className='Link'>Retour</div>
      </Link>
      {data?.addresses[0] ? (
        <Address {...data.addresses[0]} />
      ) : (
        <>
          <h2>Créer une adresse</h2>
          {/* <CreateAddress fromSeller id={id} /> */}
        </>
      )}
    </>
  );
};

export default Addresses;
