import { Button, ModalFooter } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { RecoType } from '../../../types';

interface Props {
  setOpen: (open: boolean) => void;
}

const RecoCreateFooter = ({ setOpen }: Props) => (
  <ModalFooter>
    <Button
      colorScheme='teal'
      mr={3}
      onClick={() => setOpen(false)}
      variant='outline'
    >
      Fermer
    </Button>
    <Button type='submit' variant='teal'>
      C'est parti !
    </Button>
  </ModalFooter>
);

export default RecoCreateFooter;
