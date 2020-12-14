import * as React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import CreateReading from './CreateReading';

const AddReading = ({ children }: React.PropsWithChildren<unknown>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (children) {
    return (
      <span className='text-blue-700 cursor-pointer' onClick={onOpen}>
        {children}
        <CreateReading isOpen={isOpen} onClose={onClose} />
      </span>
    );
  }

  return (
    <div className='reading'>
      <div className='bg-cardbg flex h-full w-full rounded'>
        <div className='text-center text-white m-auto p-4'>
          <div className='text-xl'>
            <div className='italic'>Titre</div>
            <div className='font-bold'>Auteur</div>
          </div>
          <div>{`Note : ? / 20`}</div>
          <div className='flex-wrap'>{`Commentaire : `}</div>
          <CreateReading isOpen={isOpen} onClose={onClose} />
          <Button colorScheme='teal' onClick={onOpen}>
            Ajouter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddReading;
