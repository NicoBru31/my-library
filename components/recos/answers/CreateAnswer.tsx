import { Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { updateReco } from '../../../fetch';
import useBooks from '../../../hooks/useBooks';
import { GoogleBookType, RecoBooksType } from '../../../types';
import SearchReading from '../../readings/SearchReading';
import { RecoSellerProps } from '../RecoSeller';

const NB_RECOS = [Math.random().toString(), Math.random().toString()];

const CreateAnswer = ({ _id, sellerId, answers }: RecoSellerProps) => {
  const answer = answers?.find((answer) => answer.sellerId === sellerId);
  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<RecoBooksType>({
    defaultValues: answer || { books: [], sellerId },
  });
  const books = watch('books');
  const { data, fetchBooks } = useBooks();

  const send: SubmitHandler<RecoBooksType> = (data) => updateReco(data, _id);

  const select = (book: GoogleBookType) =>
    setValue('books', [book.id, ...books]);

  useEffect(() => {
    if (books?.length) fetchBooks(...books);
  }, [books]);

  return (
    <form onSubmit={handleSubmit(send)}>
      <input className='hidden' name='sellerId' ref={register()} />
      <Controller
        control={control}
        name='books'
        render={({ value }) => (
          <>
            {NB_RECOS.map((r, index) => (
              <div key={r}>
                <div>{`Proposition n°${index + 1}`}</div>
                <SearchReading clearOnSelect onSelect={select} />
                <div>{data.find(({ _id }) => _id === value[index])?.title}</div>
              </div>
            ))}
          </>
        )}
      />
      <Button colorScheme='teal' type='submit'>
        Envoyer
      </Button>
    </form>
  );
};

export default CreateAnswer;
