import * as React from 'react';
import RecoContext from '../contexts/RecoContext';
import { RecoType } from '../types';

const RecoProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [reco, setReco] = React.useState<RecoType>();

  const changeReco = (newReco?: RecoType) => {
    if (newReco) {
      setReco(undefined);
      setTimeout(() => setReco(newReco), 500);
    } else setReco(undefined);
  };

  return (
    <RecoContext.Provider value={{ reco, setReco: changeReco }}>
      {children}
    </RecoContext.Provider>
  );
};

export default RecoProvider;
