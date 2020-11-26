import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { deleteAddress } from '../../fetch';
import useDelete from '../../hooks/useDelete';
import { CustomerType } from '../../types';
import Confirm from '../utils/Confirm';

interface Props {
  id: string;
}

const DeleteAddress = ({ id }: Props) => {
  const { mutate, isLoading } = useDelete<CustomerType>({
    action: deleteAddress,
    key: 'customer',
    subKey: 'addresses',
  });
  const [open, setOpen] = useState(false);

  const remove = () => mutate(id);

  return (
    <>
      <Confirm
        open={open}
        onConfirm={remove}
        setOpen={setOpen}
        title='Voulez-vous supprimer cette adresse ?'
      />
      <Button
        disabled={isLoading}
        className='ml-2'
        colorScheme='red'
        onClick={() => setOpen(true)}
      >
        Supprimer
      </Button>
    </>
  );
};

export default DeleteAddress;
