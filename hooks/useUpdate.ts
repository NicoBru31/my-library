import { useContext, useEffect } from 'react';
import { queryCache, useMutation } from 'react-query';
import AlertContext from '../contexts/AlertContext';
import LoaderContext from '../contexts/LoaderContext';

type Props<R, T> = {
  action: (data: T) => Promise<R>;
  key: string;
  reset: () => void;
  subKey?: string;
};

const useUpdate = <R, S, T>({ action, key, reset, subKey }: Props<R, T>) => {
  const { setAlert } = useContext(AlertContext);
  const { setLoader } = useContext(LoaderContext);
  const [mutate, { isLoading }] = useMutation<R, S, T>(action, {
    onError: (e) => {
      console.log(e);
      setAlert({
        message: "Une erreur s'est produite ! Échec de l'action.",
        status: 'error',
      });
    },
    onSuccess: (data) => {
      queryCache.setQueryData(key, (oldData: S) =>
        subKey
          ? {
              ...oldData,
              [subKey]: [...oldData[subKey], data],
            }
          : { ...oldData, ...data },
      );
      reset();
    },
  });

  useEffect(() => {
    setLoader({ isLoading });
  }, [isLoading]);

  return { mutate, isLoading };
};

export default useUpdate;
