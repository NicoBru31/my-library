import * as React from 'react';
import { Alert, AlertIcon, CloseButton } from '@chakra-ui/react';
import AlertContext, { AlertInterface } from '@/contexts/AlertContext';

const AlertProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [alert, setAlert] = React.useState<AlertInterface>();

  React.useEffect(() => {
    if (alert?.message) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [alert]);

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {alert?.message && (
        <Alert variant='solid' status={alert.status} zIndex={10}>
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
