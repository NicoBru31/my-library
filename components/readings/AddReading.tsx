import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import CreateReading from './CreateReading';

const AddReading = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='flex h-56 w-full md:w-1/4 m-8 shadow-lg'>
      <div className='bg-cardbg flex h-full w-full'>
        <div className='text-center text-white m-auto p-4'>
          <div className='text-xl'>
            <div className='italic'>Titre</div>
            {` par Auteur`}
          </div>
          <div>{`Note : ? / 20`}</div>
          <div className='flex-wrap'>{`Commentaires : `}</div>
          <CreateReading open={open} setOpen={setOpen} />
          <Button colorScheme='teal' onClick={() => setOpen(true)}>
            Ajouter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddReading;
