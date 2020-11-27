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
    <div className='home-picture flex justify-center'>
      <form
        className='bg-cardbg mt-6 h-auto p-4 rounded'
        onSubmit={handleSubmit(send)}
        style={{ height: 'fit-content' }}
      >
        {loginFields.map((field) => (
          <Input
            {...field}
            css={{ color: 'white' }}
            error={errors[field.name]}
            focusBorderColor='green.500'
            key={field.name}
            register={register}
            variant='flushed'
          />
        ))}
        <Button
          className='text-center'
          colorScheme='teal'
          disabled={loader.isLoading}
          type='submit'
        >
          Je me connecte
        </Button>
      </form>
    </div>
  );
};

export default Login;
