import { Button, useDisclosure } from '@chakra-ui/react';
import useDelete from '../../hooks/useDelete';
import { CustomerType } from '../../types';
import Confirm from './Confirm';

interface Props {
  field: keyof CustomerType;
  id: string;
  remove: (id: string) => Promise<{ id: string }>;
}

const RemoveModal = ({ field, id, remove }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useDelete({
    action: remove,
    key: 'customer',
    subKey: field,
  });

  return (
    <>
      <Confirm
        isOpen={isOpen}
        onConfirm={() => mutate(id)}
        onClose={onClose}
        title='Voulez-vous supprimer cette lecture ?'
      />
      <Button
        className='ml-4'
        disabled={isLoading}
        colorScheme='red'
        onClick={onOpen}
      >
        Supprimer
      </Button>
    </>
  );
};

export default RemoveModal;
