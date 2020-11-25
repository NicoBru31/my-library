import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { RecoType } from '../../types';
import CreateAnswer from './answers/CreateAnswer';

export interface RecoSellerProps extends RecoType {
  sellerId: string;
}

const RecoSeller = (props: RecoSellerProps) => (
  <AccordionItem>
    <AccordionButton>
      <Box flex='1' textAlign='left'>
        {`Demande du ${dayjs(props.createdAt).format('DD-MM-YYYY')}`}
      </Box>
      <AccordionIcon />
    </AccordionButton>
    <AccordionPanel>
      <CreateAnswer {...props} />
    </AccordionPanel>
  </AccordionItem>
);

export default RecoSeller;
