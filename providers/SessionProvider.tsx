import { useState } from 'react';
import { useEffect } from 'react';
import { PropsWithChildren } from 'react';
import SessionContext, { Session } from '../contexts/SessionContext';

const SessionProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [session, setSession] = useState<Session>();

  useEffect(() => {
    const localSession = window.localStorage.getItem('liber:session');
    if (localSession) setSession(JSON.parse(localSession));
  }, [setSession]);

  useEffect(() => {
    if (session)
      window.localStorage.setItem('liber:session', JSON.stringify(session));
  }, [session]);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
