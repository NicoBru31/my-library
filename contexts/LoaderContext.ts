import { createContext, Dispatch, SetStateAction } from 'react';

export interface LoaderInterface {
  isLoading: boolean;
}

export default createContext<{
  loader: LoaderInterface;
  setLoader: Dispatch<SetStateAction<LoaderInterface>>;
}>({
  loader: { isLoading: false },
  setLoader: () => {},
});
