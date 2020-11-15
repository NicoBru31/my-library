import { useRouter } from 'next/router';
import CreateSeller from '../../components/sellers/CreateSeller';
import useSession from '../../hooks/useSession';

const Seller = () => {
  const session = useSession();
  const router = useRouter();

  const connect = () =>
    router.push({ pathname: '/login', search: 'isSeller=true' });

  return (
    <>
      <button onClick={connect}>Se connecter</button>
      {!session?.id && <CreateSeller />}
    </>
  );
};

export default Seller;
