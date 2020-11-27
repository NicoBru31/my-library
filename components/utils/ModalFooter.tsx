import { Button } from '@chakra-ui/react';

interface Props {
  addText: string;
  isLoading: boolean;
  setOpen: (open: boolean) => void;
}

const ModalFooter = ({ addText, isLoading, setOpen }: Props) => {
  return (
    <div className='flex justify-end mt-2'>
      <Button
        colorScheme='teal'
        className='mr-4'
        disabled={isLoading}
        variant='outline'
        onClick={() => setOpen(false)}
      >
        Fermer
      </Button>
      <Button colorScheme='teal' disabled={isLoading} type='submit'>
        {addText}
      </Button>
    </div>
  );
};

export default ModalFooter;
