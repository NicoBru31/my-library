import { Button } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createAddress } from '../../fetch';
import useUpdate from '../../hooks/useUpdate';
import { AddressType, CustomerType, CreateAddressType } from '../../types';
import Input from '../form/Input';
import fields from './addressFields';

interface Props {
  fromSeller?: boolean;
  id: string;
}

const CreateAddress = ({ fromSeller, id }: Props) => {
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
    key: fromSeller ? 'seller' : 'customer',
    reset,
    subKey: 'addresses',
  });

  const save: SubmitHandler<AddressType> = (variables) =>
    mutate({ address: variables, fromSeller, id });

  return (
    <form onSubmit={handleSubmit(save)}>
      {fields.map((field) => (
        <Input
          {...field}
          error={errors[field.name]}
          key={field.name}
          register={register}
        />
      ))}
      <Button disabled={isLoading} colorScheme='teal' type='submit'>
        Ajouter
      </Button>
    </form>
  );
};

export default CreateAddress;
