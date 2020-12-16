import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import AlertContext from '../contexts/AlertContext';

type Props = {
  action: (id: string) => Promise<{ id: string }>;
  key: string;
  subKey: string;
};

const useDelete = <T>({ action, key, subKey }: Props) => {
  const { setAlert } = useContext(AlertContext);
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

  return { mutate, isLoading };
};

export default useDelete;
