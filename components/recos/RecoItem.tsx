import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import { GrAlert } from 'react-icons/gr';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { CustomerType, RecoType } from '../../types';
import Answer from './answers/Answer';

const RecoItem = ({ answers, createdAt, notified }: RecoType) => {
  const { data } = useQuery<CustomerType>('customer');

  return (
    <AccordionItem>
      <AccordionButton>
        <Box
          flex='1'
          textAlign='left'
          className='flex justify-start align-baseline'
        >
          <div className='mr-2'>{`Ma reco du ${dayjs(createdAt).format(
            'DD-MM-YYYY',
          )}`}</div>
          {!notified?.includes(data._id) && <GrAlert />}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        {answers
          ?.filter((answer) => answer.books.length > 0)
          ?.map((answer) => (
            <Answer {...answer} key={answer.sellerId} />
          ))}
        {!answers?.map(({ books }) => books)?.flat(1).length && (
          <div>Pas de réponse pour le moment</div>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default RecoItem;
