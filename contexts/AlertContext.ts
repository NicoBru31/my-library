import { createContext, Dispatch, SetStateAction } from 'react';
import { AlertStatus } from '@chakra-ui/react';

export interface AlertInterface {
  status?: AlertStatus;
  message: string;
}

export default createContext<{
  alert?: AlertInterface;
  setAlert: Dispatch<SetStateAction<AlertInterface | undefined>>;
}>({
  setAlert: () => {},
});
