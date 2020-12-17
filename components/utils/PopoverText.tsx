import * as React from 'react';
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';

interface Props {
  headerText: string;
  trigger?: string;
  full: string;
}

const PopoverText = ({ headerText, full, trigger = 'voir tout' }: Props) => (
  <Popover>
    <PopoverTrigger>
      <span className='text-blue-800 hover:opacity-50 cursor-pointer'>
        {trigger}
      </span>
    </PopoverTrigger>
    <Portal>
      <PopoverContent borderWidth={2} borderColor='black' borderStyle='solid'>
        <PopoverArrow />
        <PopoverHeader bg='#38a169' className='text-white'>
          {headerText}
        </PopoverHeader>
        <PopoverCloseButton color='white' />
        <PopoverBody>{full}</PopoverBody>
      </PopoverContent>
    </Portal>
  </Popover>
);

export default PopoverText;
