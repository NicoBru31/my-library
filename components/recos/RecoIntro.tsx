import { Button, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import { introReco } from '../customer/intro';
import Intro from '../utils/Intro';
import RecoCreate from './create/RecoCreate';
import intro from './intro';

const RecoIntro = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Intro {...introReco} />
      <div className='sm:block md:flex items-baseline justify-around my-4'>
        {intro.map(({ text, image }) => (
          <div
            key={text}
            className='card text-white text-center h-32 sm:w-4/5 md:w-1/4 p-4'
          >
            <div>{text}</div>
            <Image src={image} height={60} width={60} />
          </div>
        ))}
      </div>
      <div className='flex justify-center mb-10'>
        <Button colorScheme='teal' onClick={onOpen}>
          Demander une reco
        </Button>
      </div>
      <RecoCreate isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default RecoIntro;
