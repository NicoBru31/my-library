import { Button, useDisclosure } from '@chakra-ui/react';
import CreateAddress from './CreateAddress';

const AddAddress = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <div className='items-center border border-dashed border-gray-600 flex justify-center h-1/4 m-8 rounded p-4 w-1/4'>
      <Button colorScheme='teal' onClick={onOpen}>
        Ajouter
      </Button>
      <CreateAddress isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default AddAddress;
