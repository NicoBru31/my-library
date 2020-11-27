import { Button } from '@chakra-ui/react';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { updateCustomer } from '../../fetch';
import useUpdate from '../../hooks/useUpdate';
import { CustomerType, UpdateCustomerType } from '../../types';
import Input from '../form/Input';
import fields from './fields';

const CustomerUpdate = () => {
  const { data: customer } = useQuery<CustomerType>('customer');
  const { errors, handleSubmit, register, reset } = useForm<CustomerType>({
    defaultValues: customer,
    mode: 'onBlur',
    shouldFocusError: true,
  });
  const { mutate, isLoading } = useUpdate<
    CustomerType,
    CustomerType,
    UpdateCustomerType
  >({
    action: updateCustomer,
    isUpdate: true,
    key: 'customer',
    reset,
  });

  const save: SubmitHandler<CustomerType> = (variables) =>
    mutate({ customer: variables, id: customer._id });

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
      <Button disabled={isLoading} colorScheme='teal' type='submit'>
        Enregistrer
      </Button>
    </form>
  );
};

export default CustomerUpdate;
