import { SubmitHandler, useForm } from 'react-hook-form';
import { queryCache, useMutation } from 'react-query';
import { Button } from '@chakra-ui/react';
import { createAddress, CreateAddressType } from '../../fetch';
import { AddressType } from '../../types';
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
  const [mutate] = useMutation<AddressType, AddressType, CreateAddressType>(
    createAddress,
    {
      onSuccess: (data) => {
        queryCache.setQueryData('addresses', (oldData: AddressType[]) => [
          ...oldData,
          data,
        ]);
        reset();
      },
    },
  );

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
      <Button colorScheme='teal' type='submit'>
        Ajouter
      </Button>
    </form>
  );
};

export default CreateAddress;
