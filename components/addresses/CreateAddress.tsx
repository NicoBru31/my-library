import { Button } from '@chakra-ui/react';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { createAddress } from '../../fetch';
import useSession from '../../hooks/useSession';
import useUpdate from '../../hooks/useUpdate';
import {
  AddressType,
  CreateAddressType,
  CustomerType,
  ModalProps,
} from '../../types';
import ModalFacc from '../facc/ModalFacc';
import Input from '../form/Input';
import fields from './addressFields';

const CreateAddress = ({ open, setOpen }: ModalProps) => {
  const session = useSession();
  const { errors, handleSubmit, register, reset } = useForm<AddressType>({
    mode: 'onBlur',
    shouldFocusError: true,
  });
  const { mutate, isLoading } = useUpdate<
    AddressType,
    CustomerType,
    CreateAddressType
  >({
    action: createAddress,
    key: !session?.isCustomer ? 'seller' : 'customer',
    reset,
    subKey: 'addresses',
  });

  const save: SubmitHandler<AddressType> = (variables) =>
    mutate({
      address: variables,
      fromSeller: !session?.isCustomer,
      id: session?.id,
    }).then(() => setOpen(false));

  return (
    <ModalFacc open={open} setOpen={setOpen} title='Créer une adresse'>
      <form onSubmit={handleSubmit(save)}>
        {fields.map((field) => (
          <Input
            {...field}
            error={errors[field.name] as FieldError}
            key={field.name}
            register={register}
          />
        ))}
        <Button disabled={isLoading} colorScheme='teal' type='submit'>
          Ajouter
        </Button>
      </form>
    </ModalFacc>
  );
};

export default CreateAddress;
