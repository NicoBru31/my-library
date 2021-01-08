import * as React from 'react';
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
  BookType,
  CreateReadingType,
  CustomerType,
  GoogleBookType,
  ModalProps,
  ReadingType,
} from '../../types';
import Book from '../books/Book';
import ModalFacc from '../facc/ModalFacc';
import Input from '../form/Input';
import ModalFooter from '../utils/ModalFooter';
import CreateReadingSelectedBook from './CreateReadingSelectedBook';
import fields from './readingFields';
import SearchReading from './SearchReading';

const CreateReading = (props: ModalProps) => {
  const session = useSession();
  const [googleBook, setGoogleBook] = React.useState<GoogleBookType>();
  const [bookId, setBookId] = React.useState('');
  const methods = useForm<ReadingType>({
    mode: 'onBlur',
    shouldFocusError: true,
  });
  const { errors, handleSubmit, register, reset } = methods;
  const { mutateAsync, isLoading } = useUpdate<
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
    mutateAsync({
      reading: {
        ...reading,
        book: {
          author: googleBook?.volumeInfo?.authors?.join(', '),
          title: googleBook?.volumeInfo?.title,
          googleId: googleBook?.id,
        },
      },
      id: session.id,
    }).then(props.onClose);

  const select = (gBook: GoogleBookType, book: BookType) => {
    if (gBook) setGoogleBook(gBook);
    if (book) setBookId(book._id);
  };

  return (
    <ModalFacc {...props} title='Ajouter une note de lecture'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(create)}>
          <SearchReading onSelect={select} />
          {googleBook && (
            <CreateReadingSelectedBook
              googleBook={googleBook}
              setGoogleBook={setGoogleBook}
            />
          )}
          {bookId && <Book bookId={bookId} />}
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
            onClose={props.onClose}
          />
        </form>
      </FormProvider>
    </ModalFacc>
  );
};

export default CreateReading;
