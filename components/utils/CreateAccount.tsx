import * as React from 'react';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import useLogin from '../../hooks/useLogin';
import useUpdate from '../../hooks/useUpdate';
import { Field } from '../../types';
import Input from '../form/Input';

interface Props<T> {
  back: () => void;
  create: (data: T) => Promise<{ _id: string }>;
  field: 'customer' | 'seller';
  fields: Field<T>[];
}

const CreateAccount = <
  T extends { _id: string; email: string; password: string }
>({
  back,
  create,
  field,
  fields,
}: Props<T>) => {
  const { push } = useRouter();
  const { errors, handleSubmit, register, reset, setError } = useForm<
    T & { confirm: string }
  >({
    mode: 'onBlur',
    shouldFocusError: true,
  });
  const { mutateAsync, isLoading } = useUpdate({
    action: create,
    key: field,
    reset,
  });
  const login = useLogin();

  const save: SubmitHandler<T & { confirm: string }> = async (variables) => {
    if (variables.confirm !== variables.password)
      //@ts-expect-error
      return setError('confirm', {
        message: 'Les mots de passe doivent être identiques',
      });
    const { _id } = await mutateAsync(variables as T);
    await login({ email: variables.email, password: variables.password });
    push({ pathname: `/${field}s/${_id}` });
  };

  return (
    <form className='bg-cardbg mt-6 p-4 rounded' onSubmit={handleSubmit(save)}>
      {fields.map((field) => (
        <Input
          {...field}
          css={{ color: 'white' }}
          error={errors[field.name] as FieldError}
          focusBorderColor='green.500'
          key={field.name.toString()}
          register={register}
          variant='flushed'
        />
      ))}
      <Input
        css={{ color: 'white' }}
        error={errors.confirm as FieldError}
        focusBorderColor='green.500'
        name='confirm'
        placeholder='Confirmez votre mot de passe'
        register={register}
        type='password'
        variant='flushed'
      />
      <div className='flex justify-end mt-4'>
        <Button
          className='mr-4'
          colorScheme='teal'
          onClick={back}
          variant='outline'
        >
          Retour
        </Button>
        <Button disabled={isLoading} colorScheme='teal' type='submit'>
          Enregistrer
        </Button>
      </div>
    </form>
  );
};

export default CreateAccount;
