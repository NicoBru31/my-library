import { Button } from '@chakra-ui/react';
import * as React from 'react';
import useRouting from '../../hooks/useRouting';

const GoReco = () => {
  const { goReco } = useRouting();

  return (
    <div className='reading'>
      <div className='bg-cardbg flex h-full w-full rounded'>
        <div className='text-center text-white m-auto p-4'>
          <div className='text-xl'>Quelle sera votre prochaine lecture ?</div>
          <div>{`Note : 20 / 20`}</div>
          <div className='flex-wrap'>{`Commentaire : `}</div>
          <Button colorScheme='teal' onClick={goReco}>
            Recommandations
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GoReco;
