import { Button } from '@chakra-ui/react';
import * as React from 'react';
import { useQueryClient } from 'react-query';
import { createBook } from '../../../fetch';
import useAnswer from '../../../hooks/useAnswer';
import { BookType, GoogleBookType, RecoBooksType } from '../../../types';
import SearchReading from '../../readings/SearchReading';
import DeleteAnswer from '../answers/DeleteAnswer';
import RecoSellerMessage from './RecoSellerMessage';

const RecoAnswerSeller = ({ books }: RecoBooksType) => {
  const { update, updateLocalAnswer } = useAnswer();
  const queryCache = useQueryClient();

  const select = async (item: GoogleBookType, newBook?: BookType) => {
    if (item) {
      const book = await createBook(item);
      queryCache.setQueryData<BookType[]>('books', (data) => [book, ...data]);
      updateLocalAnswer(book._id);
    }
    if (newBook) updateLocalAnswer(newBook._id);
  };

  return (
    <div className='w-full md:w-3/4'>
      <div className='text-white'>Mes propositions :</div>
      {books[0] ? (
        <DeleteAnswer bookId={books[0]} />
      ) : (
        <div className='my-2'>
          <SearchReading onSelect={select} theme='white' />
        </div>
      )}
      {books[1] ? (
        <DeleteAnswer bookId={books[1]} />
      ) : (
        <div className='my-2'>
          <SearchReading onSelect={select} theme='white' />
        </div>
      )}
      <RecoSellerMessage />
      <Button
        className='mt-4 hover:opacity-50'
        colorScheme='tail'
        onClick={update}
        variant='outline'
      >
        Enregistrer
      </Button>
    </div>
  );
};

export default RecoAnswerSeller;
