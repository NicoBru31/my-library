import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import {
  FieldError,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { createReading } from '../../fetch';
import useUpdate from '../../hooks/useUpdate';
import {
  CustomerType,
  GoogleBookType,
  ReadingType,
  CreateReadingType,
} from '../../types';
import Input from '../form/Input';
import fields from './readingFields';
import SearchReading from './SearchReading';

interface Props {
  id: string;
}

const CreateReading = ({ id }: Props) => {
  const [googleBook, setGoogleBook] = useState<GoogleBookType>();
  const methods = useForm<ReadingType>({
    mode: 'onBlur',
    shouldFocusError: true,
  });
  const { errors, handleSubmit, register, reset, setValue } = methods;
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
    mutate({
      reading: {
        ...reading,
        book: {
          author: googleBook?.volumeInfo?.authors?.join(', '),
          title: googleBook?.volumeInfo?.title,
          googleId: googleBook?.id,
        },
      },
      id,
    });

  const select = (book: GoogleBookType) => setGoogleBook(book);

  return (
    <FormProvider {...methods}>
      <div>Ajouter une note de lecture :</div>
      <form onSubmit={handleSubmit(create)}>
        <SearchReading onSelect={select} />
        {fields.map((field) => (
          <Input
            {...field}
            error={errors[field.name] as FieldError}
            register={register}
            key={field.name}
          />
        ))}
        <Button colorScheme='teal' disabled={isLoading} type='submit'>
          Ajouter ce commentaire
        </Button>
      </form>
    </FormProvider>
  );
};

export default CreateReading;
