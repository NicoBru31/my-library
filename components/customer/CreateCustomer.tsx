import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { createCustomer } from '../../fetch';
import useUpdate from '../../hooks/useUpdate';
import { CustomerType } from '../../types';
import Input from '../form/Input';
import fields from './fields';

const CreateCustomer = () => {
  const { push } = useRouter();
  const { errors, handleSubmit, register, reset, setError } = useForm<
    CustomerType
  >({
    mode: 'onBlur',
    shouldFocusError: true,
  });
  const { mutate, isLoading } = useUpdate<
    CustomerType,
    CustomerType,
    CustomerType
  >({
    action: createCustomer,
    key: 'customer',
    reset,
  });

  const save: SubmitHandler<CustomerType> = (variables) => {
    if (variables.confirm !== variables.password)
      return setError('confirm', {
        message: 'Les mots de passe doivent être identiques',
      });
    mutate(variables).then(() => push({ pathname: '/login' }));
  };

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
      <Input
        error={errors.confirm}
        name='confirm'
        placeholder='Confirmez votre mot de passe'
        register={register}
        type='password'
      />
      <Button disabled={isLoading} colorScheme='teal' type='submit'>
        Enregistrer
      </Button>
    </form>
  );
};

export default CreateCustomer;
