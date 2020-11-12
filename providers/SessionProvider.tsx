import { useState } from 'react';
import { PropsWithChildren } from 'react';
import SessionContext, { Session } from '../contexts/SessionContext';

const SessionProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [session, setSession] = useState<Session>();

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
