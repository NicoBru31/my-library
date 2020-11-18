import { useState, PropsWithChildren } from 'react';
import { Alert, AlertIcon, CloseButton } from '@chakra-ui/react';
import AlertContext, { AlertInterface } from '../contexts/AlertContext';

const AlertProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [alert, setAlert] = useState<AlertInterface>();

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {alert && (
        <Alert status={alert.status} zIndex={10}>
          <AlertIcon />
          {alert.message}
          <CloseButton
            onClick={() => setAlert(undefined)}
            position='absolute'
            right='8px'
            top='8px'
          />
        </Alert>
      )}
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
