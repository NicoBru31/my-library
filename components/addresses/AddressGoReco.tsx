import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import * as React from 'react';
import useSession from '../../hooks/useSession';

const AddressGoReco = () => {
  const { push } = useRouter();
  const { id } = useSession();

  const goReco = () => push({ pathname: `/customers/recos/${id}` });

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
