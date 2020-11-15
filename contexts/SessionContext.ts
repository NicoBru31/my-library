import { createContext, Dispatch, SetStateAction } from 'react';

export interface Session {
  id: string;
  isCustomer?: boolean;
}

export default createContext<{
  session: Session;
  setSession: Dispatch<SetStateAction<Session>>;
}>({
  session: { id: '' },
  setSession: () => {},
});
