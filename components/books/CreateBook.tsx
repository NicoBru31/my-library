import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import AlertContext from '@/contexts/AlertContext';
import LoaderContext from '@/contexts/LoaderContext';
import { createBookWithoutGoogle } from '@/fetch/index';
import { BookType, GoogleBookType, ModalProps } from '@/types/index';
import ModalFacc from '../facc/ModalFacc';
import Input from '../form/Input';
import ModalFooter from '../utils/ModalFooter';
import fields from './fields';

interface Props extends ModalProps {
  onSelect: (item: GoogleBookType, book?: BookType) => void;
  search: string;
}

const CreateBook = ({ onSelect, search, ...props }: Props) => {
  const { setAlert } = React.useContext(AlertContext);
  const { setLoader } = React.useContext(LoaderContext);
  const methods = useForm<BookType>({
    shouldFocusError: true,
  });
  const { errors, handleSubmit, register, reset } = methods;
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createBookWithoutGoogle, {
    mutationKey: 'books',
    onMutate: () => setLoader({ isLoading: true }),
    onSettled: () => setLoader({ isLoading: false }),
    onError: () =>
      setAlert({
        message: "Une erreur s'est produite ! Échec de l'action.",
        status: 'error',
      }),
    onSuccess: (data) => {
      queryClient.setQueryData<BookType[]>('books', (old) => [data, ...old]);
      reset();
      setAlert({ message: '' });
      onSelect(null, data);
      props.onClose();
    },
  });

  const save: SubmitHandler<BookType> = (book) => mutate(book);

  return (
    <ModalFacc {...props} title='Créer un livre'>
      <form onSubmit={handleSubmit(save)}>
        {fields.map((field) => (
          <Input
            {...field}
            autoComplete='on'
            classLabel='text-black'
            defaultValue={field.name === 'title' ? search : ''}
            error={errors[field.name]}
            key={field.name}
            register={register}
          />
        ))}
        <ModalFooter
          addText='Créer'
          isLoading={isLoading}
          onClose={props.onClose}
        />
      </form>
    </ModalFacc>
  );
};

export default CreateBook;
