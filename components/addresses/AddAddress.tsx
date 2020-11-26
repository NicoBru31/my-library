import { Button, Skeleton, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import CreateAddress from './CreateAddress';

const AddAddress = () => {
  const [open, setOpen] = useState(false);

  return (
    <Stack className='border border-dashed border-gray-600 cursor-pointer h-1/4 m-8 rounded p-4 w-1/4'>
      <Skeleton height='20px' />
      <Skeleton height='20px' />
      <Skeleton height='20px' />
      <div className='flex justify-end mt-2'>
        <Button colorScheme='teal' onClick={() => setOpen(true)}>
          Ajouter
        </Button>
      </div>
      <CreateAddress open={open} setOpen={setOpen} />
    </Stack>
  );
};

export default AddAddress;
