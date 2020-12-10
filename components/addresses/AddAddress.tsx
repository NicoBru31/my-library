import { Button, useDisclosure } from '@chakra-ui/react';
import CreateAddress from './CreateAddress';

const AddAddress = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <div className='reading border border-dashed border-gray-600 flex justify-center items-center p-4'>
      <Button colorScheme='teal' onClick={onOpen}>
        Ajouter
      </Button>
      <CreateAddress isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default AddAddress;
