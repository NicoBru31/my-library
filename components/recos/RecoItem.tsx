import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { RecoType } from '../../types';
import Answer from './answers/Answer';

const RecoItem = ({ answers, createdAt }: RecoType) => (
  <AccordionItem>
    <AccordionButton>
      <Box flex='1' textAlign='left'>
        {`Ma reco du ${dayjs(createdAt).format('DD-MM-YYYY')}`}
      </Box>
      <AccordionIcon />
    </AccordionButton>
    <AccordionPanel pb={4}>
      {answers?.map((answer) => (
        <Answer {...answer} key={answer.sellerId} />
      ))}
      {!answers?.length && <div>Pas de réponse pour le moment</div>}
    </AccordionPanel>
  </AccordionItem>
);

export default RecoItem;
