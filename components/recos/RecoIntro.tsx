import { Button } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import RecoCreate from './create/RecoCreate';
import intro from './intro';

const RecoIntro = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <h1>Comment ça marche ?</h1>
      <div className='flex items-baseline justify-between my-4'>
        {intro.map(({ text, image }) => (
          <div
            key={text}
            className='bg-cardbg text-white text-center h-32 w-1/4 p-4'
          >
            <div>{text}</div>
            <Image src={image} height={60} width={60} />
          </div>
        ))}
      </div>
      <Button colorScheme='teal' onClick={() => setOpen(true)}>
        Demander une reco
      </Button>
      <RecoCreate open={open} setOpen={setOpen} />
    </>
  );
};

export default RecoIntro;
