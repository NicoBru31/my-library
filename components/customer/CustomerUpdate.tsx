import * as React from 'react';
import { Button } from '@chakra-ui/react';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import AlertContext from '@/contexts/AlertContext';
import { updateCustomer } from '@/fetch/index';
import useUpdate from '@/hooks/useUpdate';
import { CustomerType, UpdateCustomerType } from '@/types/index';
import Input from '../form/Input';
import fields from './fields';

const CustomerUpdate = () => {
  const { setAlert } = React.useContext(AlertContext);
  const { data: customer } = useQuery<CustomerType>('customer');
  const { errors, handleSubmit, register } = useForm<CustomerType>({
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
    reset: () =>
      setAlert({
        message: 'Vos informations ont bien été enregistrées',
        status: 'success',
      }),
  });

  const save: SubmitHandler<CustomerType> = (variables) =>
    mutate({ customer: variables, id: customer._id });

  return (
    <form
      className='card-no-ml w-auto shadow-2xl'
      onSubmit={handleSubmit(save)}
    >
      {fields.map((field) => (
        <Input
          {...field}
          css={{ color: 'white' }}
          error={errors[field.name] as FieldError}
          focusBorderColor='green.500'
          key={field.name}
          register={register}
          variant='flushed'
        />
      ))}
      <div className='flex justify-center'>
        <Button
          aria-label='Enregistrer'
          disabled={isLoading}
          colorScheme='teal'
          type='submit'
        >
          Enregistrer
        </Button>
      </div>
    </form>
  );
};

export default CustomerUpdate;
