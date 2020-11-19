import { Button } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createReading, CreateReadingType } from '../../fetch';
import useUpdate from '../../hooks/useUpdate';
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
  const { mutate, isLoading } = useUpdate<
    ReadingType,
    CustomerType,
    CreateReadingType
  >({
    action: createReading,
    key: 'customer',
    reset,
    subKey: 'readings',
  });

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
      <Button colorScheme='teal' disabled={isLoading} type='submit'>
        Ajouter ce commentaire
      </Button>
    </form>
  );
};

export default CreateReading;
