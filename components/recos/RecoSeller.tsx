import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { GrAlert } from 'react-icons/gr';
import { useQuery } from 'react-query';
import { RecoType, SellerType } from '../../types';
import CreateAnswer from './answers/CreateAnswer';

export interface RecoSellerProps extends RecoType {
  sellerId: string;
}

const RecoSeller = (props: RecoSellerProps) => {
  const { data } = useQuery<SellerType>('seller');

  return (
    <AccordionItem>
      <AccordionButton>
        <Box className='flex' flex='1' textAlign='left'>
          <div className='mr-2'>{`Demande du ${dayjs(props.createdAt).format(
            'DD-MM-YYYY',
          )}`}</div>
          {!props.notified?.includes(data._id) && <GrAlert />}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <CreateAnswer {...props} />
      </AccordionPanel>
    </AccordionItem>
  );
};

export default RecoSeller;
