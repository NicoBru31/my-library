import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import SessionContext from '../../contexts/SessionContext';
import { getSeller } from '../../fetch';
import { SellerPageType, SellerType } from '../../types';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = typeof params.id === 'string' ? params.id : params.id[0];
  const seller: SellerType = await getSeller(id);
  return { props: { seller, id } };
};

const Seller = ({ seller, id }: SellerPageType) => {
  const { data } = useQuery<SellerType>('seller', { initialData: seller });
  const { setSession } = useContext(SessionContext);

  const logout = () => setSession({ id: '' });

  return (
    <>
      <h1 className='H1'>{`Bonjour ${data.name} !`}</h1>
      <Link href={`/sellers/update/${id}`}>
        <div className='Link'>Modifier mon compte</div>
      </Link>
      <Link href={`/sellers/addresses/${id}`}>
        <div className='Link'>Voir mon adresse</div>
      </Link>
      <button className='Button' onClick={logout}>
        Me déconnecter
      </button>
    </>
  );
};

export default Seller;
