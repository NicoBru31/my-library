import { Button } from '@chakra-ui/react';

interface Props {
  addText: string;
  isLoading: boolean;
  onClose: () => void;
}

const ModalFooter = ({ addText, isLoading, onClose }: Props) => (
  <div className='flex justify-end mt-2'>
    <Button
      colorScheme='teal'
      className='mr-4'
      disabled={isLoading}
      variant='outline'
      onClick={onClose}
    >
      Fermer
    </Button>
    <Button colorScheme='teal' disabled={isLoading} type='submit'>
      {addText}
    </Button>
  </div>
);

export default ModalFooter;
