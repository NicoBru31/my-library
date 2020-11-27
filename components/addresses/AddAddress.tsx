import { Button, Skeleton, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import CreateAddress from './CreateAddress';

const AddAddress = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='items-center border border-dashed border-gray-600 flex justify-center h-1/4 m-8 rounded p-4 w-1/4'>
      <Button colorScheme='teal' onClick={() => setOpen(true)}>
        Ajouter
      </Button>
      <CreateAddress open={open} setOpen={setOpen} />
    </div>
  );
};

export default AddAddress;
