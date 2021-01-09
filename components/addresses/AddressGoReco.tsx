import { Button } from '@chakra-ui/react';
import * as React from 'react';
import useRouting from '@/hooks/useRouting';

const AddressGoReco = () => {
  const { goReco } = useRouting();

  return (
    <div className='bg-cardbg text-center text-white reading flex justify-center items-center p-4'>
      <div>
        <div className='font-bold'>Prêt à demander une reco ?</div>
        <Button colorScheme='teal' onClick={goReco}>
          Je crée une reco
        </Button>
      </div>
    </div>
  );
};
export default AddressGoReco;
