import { SubmitHandler, useForm } from 'react-hook-form';
import { queryCache, useMutation } from 'react-query';
import { createReading, CreateReadingType } from '../../fetch';
import { CustomerType, ReadingType } from '../../types';
import Input from '../form/Input';
import fields from './readingFields';

interface Props {
  id: string;
}

const CreateReading = ({ id }: Props) => {
  const { errors, handleSubmit, register, reset } = useForm<ReadingType>({
    mode: 'onBlur',
    shouldFocusError: true,
  });
  const [mutate] = useMutation<ReadingType, CustomerType, CreateReadingType>(
    createReading,
    {
      onSuccess: (data) => {
        queryCache.setQueryData('customer', (customer: CustomerType) => ({
          ...customer,
          readings: [...customer.readings, data],
        }));
        reset();
      },
    },
  );

  const create: SubmitHandler<ReadingType> = async (reading) =>
    mutate({ reading, id });

  return (
    <form onSubmit={handleSubmit(create)}>
      {fields.map((field) => (
        <Input
          {...field}
          error={errors[field.name]}
          register={register}
          key={field.name}
        />
      ))}
      <button type='submit'>Ajouter ce commentaire</button>
    </form>
  );
};

export default CreateReading;
