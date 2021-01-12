import { Button } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

const NotFound = () => {
  return (
    <div className='text-center mt-10'>
      <h1 className='mb-10 font-bold text-4xl'>404</h1>
      <Image src='/404.gif' height={200} width={200} />
      <div className='text-2xl mt-5'>
        Oups.... Nous n'avons pas trouvé cette page !
      </div>
      <Link href='/'>
        <Button aria-label='Accueil' className='mt-10' colorScheme='teal'>
          Je retourne à l'accueil
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
