import { Button } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import SellerRecos from '../../components/sellers/SellerRecos';
import SessionContext from '../../contexts/SessionContext';
import { getRecos, getSeller } from '../../fetch';
import { absoluteUrl } from '../../fetch/utils';
import { RecoType, SellerPageType, SellerType } from '../../types';

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const id = typeof params.id === 'string' ? params.id : params.id[0];
  const url = absoluteUrl(req, 'localhost:3000').origin;
  const seller: SellerType = await getSeller(url, id);
  const recos: RecoType[] = await getRecos(url);
  return { props: { recos, seller, id } };
};

const Seller = ({ recos, seller, id }: SellerPageType) => {
  const { data } = useQuery<SellerType>('seller', { initialData: seller });
  useQuery<RecoType[]>('recos', { initialData: recos });
  const { setSession } = useContext(SessionContext);

  const logout = () => setSession({ id: '' });

  return (
    <>
      <h1 className='H1'>{`Bonjour ${data.name} !`}</h1>
      <SellerRecos id={id} />
      <Button colorScheme='teal' onClick={logout}>
        Me déconnecter
      </Button>
    </>
  );
};

export default Seller;
