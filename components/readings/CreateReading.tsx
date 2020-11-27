import { useState } from 'react';
import {
  FieldError,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { createReading } from '../../fetch';
import useSession from '../../hooks/useSession';
import useUpdate from '../../hooks/useUpdate';
import {
  CreateReadingType,
  CustomerType,
  GoogleBookType,
  ModalProps,
  ReadingType,
} from '../../types';
import ModalFacc from '../facc/ModalFacc';
import Input from '../form/Input';
import ModalFooter from '../utils/ModalFooter';
import fields from './readingFields';
import SearchReading from './SearchReading';

const CreateReading = ({ open, setOpen }: ModalProps) => {
  const session = useSession();
  const [googleBook, setGoogleBook] = useState<GoogleBookType>();
  const methods = useForm<ReadingType>({
    mode: 'onBlur',
    shouldFocusError: true,
  });
  const { errors, handleSubmit, register, reset } = methods;
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
      id: session.id,
    }).then(() => setOpen(false));

  const select = (book: GoogleBookType) => setGoogleBook(book);

  return (
    <ModalFacc
      open={open}
      setOpen={setOpen}
      title='Ajouter une note de lecture'
    >
      <FormProvider {...methods}>
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
          <ModalFooter
            addText='Ajouter ce commentaire'
            isLoading={isLoading}
            setOpen={setOpen}
          />
        </form>
      </FormProvider>
    </ModalFacc>
  );
};

export default CreateReading;
