import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Button } from '@chakra-ui/react';
import { updateSeller } from '../../fetch';
import { SellerType, UpdateSellerType } from '../../types';
import Input from '../form/Input';
import fields from './fields';

const SellerUpdate = () => {
  const queryClient = useQueryClient();
  const { data: seller } = useQuery<SellerType>('seller');
  const { errors, handleSubmit, register } = useForm<SellerType>({
    defaultValues: seller,
    mode: 'onBlur',
    shouldFocusError: true,
  });
  //@ts-expect-error
  const { mutate } = useMutation<SellerType, SellerType, SellerType>(
    updateSeller,
    {
      onSuccess: (data) =>
        queryClient.setQueryData('seller', (oldData: SellerType) => ({
          ...oldData,
          ...data,
        })),
    },
  );

  const save: SubmitHandler<SellerType> = (variables) =>
    mutate({ ...variables, _id: seller._id });

  return (
    <form onSubmit={handleSubmit(save)}>
      {fields.map((field) => (
        <Input
          {...field}
          error={errors[field.name] as FieldError}
          key={field.name}
          register={register}
        />
      ))}
      <Button colorScheme='teal' type='submit'>
        Enregistrer
      </Button>
    </form>
  );
};

export default SellerUpdate;
