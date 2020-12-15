import { useRouter } from 'next/router';
import useSession from './useSession';

const useRouting = () => {
  const { push } = useRouter();
  const session = useSession();

  const goLogin = () => push({ pathname: `/login` });
  const goReco = () => push({ pathname: `/customers/recos/${session.id}` });

  return { goLogin, goReco };
};

export default useRouting;
