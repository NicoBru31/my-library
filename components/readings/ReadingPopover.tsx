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
  comment: string;
}

const ReadingPopover = ({ comment }: Props) => {
  return (
    <Popover>
      <PopoverTrigger>
        <span className='text-blue-800 hover:opacity-50 cursor-pointer'>
          {' '}
          voir tout
        </span>
      </PopoverTrigger>
      <Portal>
        <PopoverContent borderWidth={2} borderColor='black' borderStyle='solid'>
          <PopoverArrow />
          <PopoverHeader bg='#38a169' className='text-white'>
            Commentaire complet :
          </PopoverHeader>
          <PopoverCloseButton color='white' />
          <PopoverBody>{comment}</PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default ReadingPopover;
