import * as React from 'react';
import { RecoType } from '../types';

export default React.createContext<{
  changeReco: (reco?: RecoType) => void;
  reco?: RecoType;
  setReco: React.Dispatch<React.SetStateAction<RecoType | undefined>>;
}>({
  changeReco: () => {},
  setReco: () => {},
});
