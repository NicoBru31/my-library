import AlertContext from '@/contexts/AlertContext';
import LoaderContext from '@/contexts/LoaderContext';
import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';

type Props<R, T> = {
  action: (data: T) => Promise<R>;
  isUpdate?: boolean;
  key: string;
  reset: () => void;
  subKey?: string;
};

const update = <R extends { _id }, S>(
  oldData: S,
  data: R,
  isUpdate: boolean,
  subKey?: string,
) => {
  if (!isUpdate) {
    if (!subKey) return { ...oldData, ...data };
    return { ...oldData, [subKey]: [...oldData[subKey], data] };
  }
  if (!subKey) return { ...oldData, ...data };
  return {
    ...oldData,
    [subKey]: [...oldData[subKey]].map((elt) =>
      elt._id === data._id ? { ...elt, ...data } : elt,
    ),
  };
};

const useUpdate = <R extends { _id: string }, S, T>({
  action,
  isUpdate = false,
  key,
  reset,
  subKey,
}: Props<R, T>) => {
  const queryClient = useQueryClient();
  const { setAlert } = useContext(AlertContext);
  const { setLoader } = useContext(LoaderContext);
  const mutation = useMutation(action, {
    onError: (e) => {
      console.log(e);
      setAlert({
        message: "Une erreur s'est produite ! Échec de l'action.",
        status: 'error',
      });
    },
    onSettled: () => setLoader({ isLoading: false }),
    onMutate: () => setLoader({ isLoading: true }),
    onSuccess: (data) => {
      queryClient.setQueryData(key, (oldData: S) =>
        update(oldData, data, isUpdate, subKey),
      );
      setAlert({ message: '' });
      reset();
    },
  });

  return mutation;
};

export default useUpdate;
