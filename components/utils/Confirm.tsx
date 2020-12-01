import { Button } from '@chakra-ui/react';
import { ModalProps } from '../../types';
import ModalFacc from '../facc/ModalFacc';

interface Props extends ModalProps {
  onConfirm: () => void;
}

const Confirm = ({ onConfirm, title, ...props }: Props) => {
  const confirm = () => {
    onConfirm();
    props.onClose();
  };

  return (
    <ModalFacc {...props} title={title}>
      <div className='flex justify-end'>
        <Button colorScheme='teal' onClick={props.onClose} variant='outline'>
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
