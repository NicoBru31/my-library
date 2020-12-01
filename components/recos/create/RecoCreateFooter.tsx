import { Button, ModalFooter } from '@chakra-ui/react';

interface Props {
  onClose: () => void;
}

const RecoCreateFooter = ({ onClose }: Props) => (
  <ModalFooter>
    <Button colorScheme='teal' mr={3} onClick={onClose} variant='outline'>
      Fermer
    </Button>
    <Button type='submit' colorScheme='teal'>
      C'est parti !
    </Button>
  </ModalFooter>
);

export default RecoCreateFooter;
