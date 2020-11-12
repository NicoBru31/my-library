import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../components/form/Input';
import loginFields from '../../components/login/loginFields';
import SessionContext from '../../contexts/SessionContext';
import { login } from '../../fetch';

export interface LoginInterface {
  email: string;
  password: string;
}

const Login = () => {
  const { errors, handleSubmit, register } = useForm<LoginInterface>();
  const { session, setSession } = useContext(SessionContext);
  const router = useRouter();

  const send: SubmitHandler<LoginInterface> = async (data) => {
    const log = await login(data);
    setSession(log);
  };

  useEffect(() => {
    if (session?.id) router.push({ pathname: `/customers/${session.id}` });
  }, [session]);

  return (
    <form onSubmit={handleSubmit(send)}>
      {loginFields.map((field) => (
        <Input
          {...field}
          error={errors[field.name]}
          key={field.name}
          register={register}
        />
      ))}
      <button type='submit'>Je me connecte</button>
    </form>
  );
};

export default Login;
