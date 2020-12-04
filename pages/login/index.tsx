import * as React from 'react';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import fields from '../../components/customer/fields';
import Input from '../../components/form/Input';
import loginFields from '../../components/login/loginFields';
import sellerFields from '../../components/sellers/fields';
import CreateAccount from '../../components/utils/CreateAccount';
import LoaderContext from '../../contexts/LoaderContext';
import { createCustomer, createSeller } from '../../fetch';
import useLogin from '../../hooks/useLogin';

export interface LoginInterface {
  email: string;
  password: string;
}

const Login = () => {
  const [create, setCreate] = React.useState<'customer' | 'seller'>();
  const { errors, handleSubmit, register } = useForm<LoginInterface>({
    mode: 'onBlur',
    shouldFocusError: true,
  });
  const { loader } = React.useContext(LoaderContext);
  const { query } = useRouter();
  const login = useLogin();

  const goCreate = () => setCreate(query?.isSeller ? 'seller' : 'customer');

  const send: SubmitHandler<LoginInterface> = (data) => login(data);

  return (
    <div className='home-picture flex justify-center'>
      {create === 'customer' && (
        <CreateAccount
          back={() => setCreate(undefined)}
          create={createCustomer}
          field={create}
          fields={fields}
        />
      )}
      {create === 'seller' && (
        <CreateAccount
          back={() => setCreate(undefined)}
          create={createSeller}
          field={create}
          fields={sellerFields}
        />
      )}
      {!create && (
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
          <div className='flex justify-end mt-4'>
            <Button
              className='mr-4'
              colorScheme='teal'
              disabled={loader.isLoading}
              type='submit'
            >
              Je me connecte
            </Button>
            <Button colorScheme='teal' onClick={goCreate}>
              Je crée mon compte
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
