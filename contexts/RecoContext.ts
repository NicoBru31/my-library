import * as React from 'react';
import { RecoBooksType, RecoType } from '../types';

export default React.createContext<{
  answer?: RecoBooksType;
  changeReco: (reco?: RecoType) => void;
  reco?: RecoType;
  setAnswer: React.Dispatch<React.SetStateAction<RecoBooksType | undefined>>;
  setReco: React.Dispatch<React.SetStateAction<RecoType | undefined>>;
}>({
  changeReco: () => {},
  setAnswer: () => {},
  setReco: () => {},
});
