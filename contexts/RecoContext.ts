import * as React from 'react';
import { RecoType } from '../types';

export default React.createContext<{
  reco?: RecoType;
  setReco: React.Dispatch<React.SetStateAction<RecoType | undefined>>;
}>({
  setReco: () => {},
});
