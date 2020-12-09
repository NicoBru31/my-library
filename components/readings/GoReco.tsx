import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import * as React from 'react';
import SessionContext from '../../contexts/SessionContext';

const GoReco = () => {
  const { push } = useRouter();
  const { session } = React.useContext(SessionContext);

  const visit = () => push({ pathname: `/customers/recos/${session.id}` });

  return (
    <div className='flex h-56 w-full md:w-4/5 m-8 shadow-lg'>
      <div className='bg-cardbg flex h-full w-full rounded'>
        <div className='text-center text-white m-auto p-4'>
          <div className='text-xl'>Quelle sera votre prochaine lecture ?</div>
          <div>{`Note : 20 / 20`}</div>
          <div className='flex-wrap'>{`Commentaire : `}</div>
          <Button colorScheme='teal' onClick={visit}>
            Recommandations
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GoReco;
