import { Button } from '@chakra-ui/react';
import { ModalProps } from '../../types';
import ModalFacc from '../facc/ModalFacc';

interface Props extends ModalProps {
  onConfirm: () => void;
}

const Confirm = ({ onConfirm, open, setOpen, title }: Props) => {
  const confirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <ModalFacc open={open} setOpen={setOpen} title={title}>
      <div className='flex justify-end'>
        <Button
          colorScheme='teal'
          onClick={() => setOpen(false)}
          variant='outline'
        >
          Non
        </Button>
        <Button className='ml-4' colorScheme='teal' onClick={confirm}>
          Oui
        </Button>
      </div>
    </ModalFacc>
  );
};

export default Confirm;
