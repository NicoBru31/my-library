import { Button } from '@chakra-ui/react';
import { useContext } from 'react';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import AlertContext from '../../contexts/AlertContext';
import { updateSeller } from '../../fetch';
import useUpdate from '../../hooks/useUpdate';
import { SellerType } from '../../types';
import Input from '../form/Input';
import fields from './fields';

const SellerUpdate = () => {
  const { setAlert } = useContext(AlertContext);
  const { data: seller } = useQuery<SellerType>('seller');
  const { errors, handleSubmit, register } = useForm<SellerType>({
    defaultValues: seller,
    mode: 'onBlur',
    shouldFocusError: true,
  });

  const { mutate } = useUpdate<SellerType, SellerType, SellerType>({
    action: updateSeller,
    key: 'seller',
    reset: () =>
      setAlert({
        message: 'Vos informations ont bien été enregistrées',
        status: 'success',
      }),
    isUpdate: true,
  });

  const save: SubmitHandler<SellerType> = (variables) =>
    mutate({ ...variables, _id: seller._id });

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
      <Button colorScheme='teal' type='submit'>
        Enregistrer
      </Button>
    </form>
  );
};

export default SellerUpdate;
