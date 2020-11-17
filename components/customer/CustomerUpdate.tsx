import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { queryCache, useMutation, useQuery } from 'react-query';
import { updateCustomer, UpdateCustomerType } from '../../fetch';
import { CustomerType } from '../../types';
import Input from '../form/Input';
import fields from './fields';

const CustomerUpdate = () => {
  const { data: customer } = useQuery<CustomerType>('customer');
  const { errors, handleSubmit, register } = useForm<CustomerType>({
    defaultValues: customer,
    mode: 'onBlur',
    shouldFocusError: true,
  });
  const [mutate] = useMutation<CustomerType, CustomerType, UpdateCustomerType>(
    updateCustomer,
    {
      onSuccess: (data) =>
        queryCache.setQueryData('customer', (oldData: CustomerType) => ({
          ...oldData,
          ...data,
        })),
    },
  );

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
      <button className='Button' type='submit'>
        Enregistrer
      </button>
    </form>
  );
};

export default CustomerUpdate;
