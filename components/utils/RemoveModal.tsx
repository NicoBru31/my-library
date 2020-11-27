import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import useDelete from '../../hooks/useDelete';
import { CustomerType } from '../../types';
import Confirm from './Confirm';

interface Props {
  field: keyof CustomerType;
  id: string;
  remove: (id: string) => Promise<{ id: string }>;
}

const RemoveModal = ({ field, id, remove }: Props) => {
  const [removeModal, setRemoveModal] = useState(false);
  const { mutate, isLoading } = useDelete({
    action: remove,
    key: 'customer',
    subKey: field,
  });

  return (
    <>
      <Confirm
        open={removeModal}
        onConfirm={() => mutate(id)}
        setOpen={setRemoveModal}
        title='Voulez-vous supprimer cette lecture ?'
      />
      <Button
        className='ml-4'
        disabled={isLoading}
        colorScheme='red'
        onClick={() => setRemoveModal(true)}
      >
        Supprimer
      </Button>
    </>
  );
};

export default RemoveModal;
