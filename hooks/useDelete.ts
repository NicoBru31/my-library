import { useContext, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import AlertContext from '../contexts/AlertContext';
import LoaderContext from '../contexts/LoaderContext';

type Props = {
  action: (id: string) => Promise<{ id: string }>;
  key: string;
  subKey: string;
};

const useDelete = <T>({ action, key, subKey }: Props) => {
  const { setAlert } = useContext(AlertContext);
  const { setLoader } = useContext(LoaderContext);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation<{ id: string }, T, string>(action, {
    onError: (e) => {
      console.log(e);
      setAlert({
        message: "Une erreur s'est produite ! Échec de la suppression.",
        status: 'error',
      });
    },
    onSuccess: ({ id }) => {
      queryClient.setQueryData(key, (oldData: T) => ({
        ...oldData,
        [subKey]: [...oldData[subKey]].filter((elt) => elt._id !== id),
      }));
      setAlert({ message: '' });
    },
  });

  useEffect(() => {
    setLoader({ isLoading });
  }, [isLoading]);

  return { mutate, isLoading };
};

export default useDelete;
