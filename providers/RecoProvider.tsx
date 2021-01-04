import * as React from 'react';
import { useQueryClient } from 'react-query';
import RecoContext from '../contexts/RecoContext';
import { patchReco } from '../fetch';
import useSession from '../hooks/useSession';
import { CustomerType, RecoType } from '../types';

const RecoProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [reco, setReco] = React.useState<RecoType>();
  const session = useSession();
  const queryClient = useQueryClient();

  const changeReco = (newReco?: RecoType) => {
    if (newReco) {
      setReco(undefined);
      setTimeout(() => setReco(newReco), 500);
    } else setReco(undefined);
  };

  React.useEffect(() => {
    if (!reco || !session?.id) return;
    patchReco(session.id, reco._id).then(({ notified }) =>
      session?.isCustomer
        ? queryClient.setQueryData<CustomerType>('customer', (data) => ({
            ...data,
            recos: data.recos.map((r) =>
              reco._id === r._id ? { ...reco, notified } : r,
            ),
          }))
        : queryClient.setQueryData<RecoType[]>('recos', (data) =>
            data.map((r) => (r._id === reco._id ? reco : r)),
          ),
    );
  }, [reco, session]);

  return (
    <RecoContext.Provider value={{ reco, setReco, changeReco }}>
      {children}
    </RecoContext.Provider>
  );
};

export default RecoProvider;
