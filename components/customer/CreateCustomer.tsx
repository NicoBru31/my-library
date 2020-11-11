import { useRouter } from 'next/router';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { queryCache, useMutation } from 'react-query';
import { createCustomer } from '../../fetch';
import { CustomerType } from '../../types';
import Input from '../form/Input';
import fields from './fields';

const CreateCustomer = () => {
  const router = useRouter();
  const { errors, handleSubmit, register, setError } = useForm<CustomerType>({
    mode: 'onBlur',
    shouldFocusError: true,
  });
  const [mutate] = useMutation<CustomerType, CustomerType, CustomerType>(
    createCustomer,
    {
      onSuccess: (data) => {
        queryCache.setQueryData('customer', data);
        router.push({ pathname: '/auth/signin' });
      },
    },
  );

  const save: SubmitHandler<CustomerType> = (variables) => {
    if (variables.confirm !== variables.password)
      return setError('confirm', {
        message: 'Les mots de passe doivent être identiques',
      });
    mutate(variables);
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
      <button type='submit'>Enregistrer</button>
    </form>
  );
};

export default CreateCustomer;
