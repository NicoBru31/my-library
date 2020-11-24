import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { updateReco } from '../../fetch';
import { GoogleBookType, RecoBooksType, RecoType } from '../../types';
import SearchReading from '../readings/SearchReading';

interface Props extends RecoType {
  sellerId: string;
}

const RecoSeller = ({ _id, sellerId }: Props) => {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<RecoBooksType>({
    defaultValues: { books: [], sellerId },
  });
  const books = watch('books');

  const send: SubmitHandler<RecoBooksType> = (data) => updateReco(data, _id);

  const select = (book: GoogleBookType) =>
    setValue('books', [book.id, ...books]);

  return (
    <form onSubmit={handleSubmit(send)}>
      <input className='hidden' name='sellerId' ref={register()} />
      <div>Mes recos pour ce client :</div>
      <Controller
        control={control}
        name='books'
        render={({ value }) => (
          <>
            <SearchReading clearOnSelect onSelect={select} />
            {value.map((book) => (
              <div key={book}>{book}</div>
            ))}
          </>
        )}
      />
      <button type='submit'>Envoyer</button>
    </form>
  );
};

export default RecoSeller;
