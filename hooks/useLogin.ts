import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import LoaderContext from '../contexts/LoaderContext';
import SessionContext, { Session } from '../contexts/SessionContext';
import { login } from '../fetch';
import { LoginInterface } from './../pages/login/index';

const useLogin = () => {
  const { setSession } = useContext(SessionContext);
  const { setLoader } = useContext(LoaderContext);
  const { query, push } = useRouter();

  const doLogin = async (data: LoginInterface) => {
    setLoader({ isLoading: true });
    let log: Session = await login(data, !!query?.isSeller);
    if (log.id) {
      setSession(log);
      if (log.isCustomer) push({ pathname: `/customers/${log.id}` });
      else push({ pathname: `/sellers/${log.id}` });
    }
  };

  useEffect(() => {
    setSession({ id: '' });
  }, [setSession]);

  return doLogin;
};

export default useLogin;
