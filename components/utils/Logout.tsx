import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import * as React from 'react';
import SessionContext from '@/contexts/SessionContext';

const Logout = () => {
  const { setSession } = React.useContext(SessionContext);
  const { push } = useRouter();

  const logout = () => {
    setSession({ id: '' });
    push({ pathname: '/' });
  };

  return (
    <Button aria-label='Se déconnecter' colorScheme='teal' onClick={logout}>
      Me déconnecter
    </Button>
  );
};

export default Logout;
