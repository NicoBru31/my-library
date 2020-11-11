import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Credentials } from '../../types';
import Input from '../form/Input';

const SignInCustomer = () => {
  const router = useRouter();
  const { handleSubmit, ...methods } = useForm<Credentials>({
    mode: 'onBlur',
    shouldFocusError: true,
  });

  const send: SubmitHandler<Credentials> = (variables) => {
    window.localStorage.setItem(
      'alexandria:credentials',
      JSON.stringify({ ...variables, id: '5fa7e9a5be1f2731691e2593' }),
    );
    router.push({ pathname: '/customers/5fa7e9a5be1f2731691e2593' });
  };

  return (
    <form onSubmit={handleSubmit(send)}>
      <Input {...methods} name='email' placeholder='e-mail' type='email' />
      <Input
        {...methods}
        name='password'
        placeholder='Mot de passe'
        type='password'
      />
      <button type='submit'>Créer un compte</button>
    </form>
  );
};

export default SignInCustomer;
