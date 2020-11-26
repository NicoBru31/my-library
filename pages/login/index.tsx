import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../components/form/Input';
import loginFields from '../../components/login/loginFields';
import LoaderContext from '../../contexts/LoaderContext';
import SessionContext, { Session } from '../../contexts/SessionContext';
import { login } from '../../fetch';

export interface LoginInterface {
  email: string;
  password: string;
}

const Login = () => {
  const { errors, handleSubmit, register } = useForm<LoginInterface>();
  const { setSession } = useContext(SessionContext);
  const { loader, setLoader } = useContext(LoaderContext);
  const router = useRouter();

  const send: SubmitHandler<LoginInterface> = async (data) => {
    setLoader({ isLoading: true });
    let log: Session = await login(data, !!router.query?.isSeller);
    setSession(log);
    if (log.isCustomer) router.push({ pathname: `/customers/${log.id}` });
    else router.push({ pathname: `/sellers/${log.id}` });
  };

  useEffect(() => {
    setSession({ id: '' });
  }, [setSession]);

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
      <Button colorScheme='teal' disabled={loader.isLoading} type='submit'>
        Je me connecte
      </Button>
    </form>
  );
};

export default Login;
