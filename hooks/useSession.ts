import { useContext } from 'react';
import SessionContext from '../contexts/SessionContext';

export default () => {
  const { session } = useContext(SessionContext);

  return session;
};
