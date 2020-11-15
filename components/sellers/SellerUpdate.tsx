import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { queryCache, useMutation, useQuery } from 'react-query';
import { updateSeller, UpdateSellerType } from '../../fetch';
import { SellerType } from '../../types';
import Input from '../form/Input';
import fields from './fields';

const SellerUpdate = () => {
  const { data: seller } = useQuery<SellerType>('seller');
  const { errors, handleSubmit, register } = useForm<SellerType>({
    defaultValues: seller,
    mode: 'onBlur',
    shouldFocusError: true,
  });
  const [mutate] = useMutation<SellerType, SellerType, UpdateSellerType>(
    updateSeller,
    {
      onSuccess: (data) =>
        queryCache.setQueryData('seller', (oldData: SellerType) => ({
          ...oldData,
          ...data,
        })),
    },
  );

  const save: SubmitHandler<SellerType> = (variables) =>
    mutate({ seller: variables, id: seller._id });

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
      <button type='submit'>Enregistrer</button>
    </form>
  );
};

export default SellerUpdate;
