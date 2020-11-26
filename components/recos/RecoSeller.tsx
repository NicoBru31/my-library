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
      <Box className='flex' flex='1' textAlign='left'>
        <div>{`Demande du ${dayjs(props.createdAt).format('DD-MM-YYYY')}`}</div>
      </Box>
      <AccordionIcon />
    </AccordionButton>
    <AccordionPanel>
      <CreateAnswer {...props} />
    </AccordionPanel>
  </AccordionItem>
);

export default RecoSeller;
