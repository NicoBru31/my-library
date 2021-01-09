import { Button } from '@chakra-ui/react';
import * as React from 'react';
import { useQuery } from 'react-query';
import { Carousel } from 'react-responsive-carousel';
import useRouting from '@/hooks/useRouting';
import { CustomerType } from '@/types/index';
import AddReading from './AddReading';
import GoReco from './GoReco';
import Reading from './Reading';

const Readings = () => {
  const { goReco } = useRouting();
  const { data } = useQuery<CustomerType>('customer');

  return (
    <>
      <div className='hidden md:grid grid-cols-3 items-center flex-wrap'>
        <AddReading />
        {data?.readings?.map((reading) => (
          <Reading {...reading} key={reading._id} />
        ))}
        <GoReco />
      </div>
      <div className='md:hidden'>
        <div className='flex justify-center mb-4'>
          <AddReading>
            <Button colorScheme='teal'>Ajouter une lecture</Button>
          </AddReading>
        </div>
        <Carousel
          infiniteLoop
          showArrows
          showIndicators
          showStatus={false}
          showThumbs={false}
        >
          {data?.readings?.map((reading) => (
            <Reading {...reading} key={reading._id} />
          ))}
        </Carousel>
        <div className='flex justify-center mt-4'>
          <Button colorScheme='teal' onClick={goReco}>
            Voir mes recommandations
          </Button>
        </div>
      </div>
    </>
  );
};

export default Readings;
