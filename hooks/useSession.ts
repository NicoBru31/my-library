import SessionContext from '@/contexts/SessionContext';
import { useContext } from 'react';

const useSession = () => {
  const { session } = useContext(SessionContext);

  return session;
};

export default useSession;
