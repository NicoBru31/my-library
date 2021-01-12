import { Button, ModalFooter } from '@chakra-ui/react';

interface Props {
  onClose: () => void;
}

const RecoCreateFooter = ({ onClose }: Props) => (
  <ModalFooter>
    <Button
      aria-label='Fermer'
      colorScheme='teal'
      mr={3}
      onClick={onClose}
      variant='outline'
    >
      Fermer
    </Button>
    <Button aria-label="C'est parti" type='submit' colorScheme='teal'>
      C'est parti !
    </Button>
  </ModalFooter>
);

export default RecoCreateFooter;
