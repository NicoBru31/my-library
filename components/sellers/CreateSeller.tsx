import { useRouter } from 'next/router';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { queryCache, useMutation } from 'react-query';
import { Button } from '@chakra-ui/react';
import { createSeller } from '../../fetch';
import { SellerType } from '../../types';
import Input from '../form/Input';
import fields from './fields';

const CreateSeller = () => {
  const router = useRouter();
  const { errors, handleSubmit, register, setError } = useForm<SellerType>({
    mode: 'onBlur',
    shouldFocusError: true,
  });
  const [mutate] = useMutation<SellerType, SellerType, SellerType>(
    createSeller,
    {
      onSuccess: (data) => {
        queryCache.setQueryData('seller', data);
        router.push({ pathname: '/login', search: 'isSeller=true' });
      },
    },
  );

  const save: SubmitHandler<SellerType> = (variables) => {
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
      <Button colorScheme='teal' type='submit'>
        Enregistrer
      </Button>
    </form>
  );
};

export default CreateSeller;
