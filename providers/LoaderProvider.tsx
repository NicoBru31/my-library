import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';
import LoaderContext, { LoaderInterface } from '../contexts/LoaderContext';

const LoaderProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [loader, setLoader] = useState<LoaderInterface>({ isLoading: false });
  const { route } = useRouter();

  useEffect(() => {
    return () => setLoader({ isLoading: false });
  }, [route]);

  return (
    <LoaderContext.Provider value={{ loader, setLoader }}>
      {loader.isLoading && <div className='dot-flashing' />}
      <div className={loader.isLoading ? 'opacity-50' : ''}>{children}</div>
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
