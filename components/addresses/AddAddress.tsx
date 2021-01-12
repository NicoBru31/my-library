import * as React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import CreateAddress from './CreateAddress';

const AddAddress = ({ children }: React.PropsWithChildren<unknown>) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      {!children ? (
        <div className='bg-cardbg reading flex justify-center items-center p-4'>
          <Button aria-label='Ajouter' colorScheme='teal' onClick={onOpen}>
            Ajouter
          </Button>
        </div>
      ) : (
        <span className='cursor-pointer text-blue-700' onClick={onOpen}>
          {children}
        </span>
      )}
      <CreateAddress isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddAddress;
