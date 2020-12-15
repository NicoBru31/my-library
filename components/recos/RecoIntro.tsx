import * as React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import { introReco } from '../customer/intro';
import Intro from '../utils/Intro';
import RecoCreate from './create/RecoCreate';
import intro from './intro';
import { motion } from 'framer-motion';
import { menuItemVariants } from '../../variants';
import { Carousel } from 'react-responsive-carousel';

const RecoIntro = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currIndex, setCurr] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => setCurr((i) => (i + 1) % 3), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Intro {...introReco} />
      <div className='hidden md:grid grid-cols-3 items-center flex-wrap my-4'>
        {intro.map(({ text, image }) => (
          <div
            className='card text-white text-center h-32 w-4/5 p-4'
            key={text}
          >
            <div>{text}</div>
            <Image src={image} height={60} width={60} />
          </div>
        ))}
      </div>
      <Carousel
        autoPlay
        className='md:hidden h-32 my-4'
        infiniteLoop
        showArrows={false}
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
      >
        {intro.map(({ text, image }) => (
          <div
            className='card text-white text-center h-32 w-4/5 p-4'
            key={text}
          >
            <div>{text}</div>
            <Image src={image} height={60} width={60} />
          </div>
        ))}
      </Carousel>
      <div className='flex justify-center my-10'>
        <Button colorScheme='teal' onClick={onOpen}>
          Demander une reco
        </Button>
      </div>
      <RecoCreate isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default RecoIntro;
