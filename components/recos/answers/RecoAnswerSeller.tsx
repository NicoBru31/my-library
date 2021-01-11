import { Button } from '@chakra-ui/react';
import * as React from 'react';
import { useQueryClient } from 'react-query';
import { createBook } from '@/fetch/index';
import useAnswer from '@/hooks/useAnswer';
import { BookType, GoogleBookType, RecoBooksType } from '@/types/index';
import SearchReading from '../../readings/SearchReading';
import DeleteAnswer from '../answers/DeleteAnswer';
import RecoSellerMessage from '../details/RecoSellerMessage';
import { randomStr } from 'tools';

const RecoAnswerSeller = ({ books }: RecoBooksType) => {
  const [bookList, setBookList] = React.useState(new Array(2).fill(''));
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

  React.useEffect(() => {
    if (books)
      setBookList(() => [...books, ...new Array(2).fill('')].slice(0, 2));
  }, [books, setBookList]);

  return (
    <div className='w-full md:w-3/4'>
      <div className='text-white'>Mes propositions :</div>
      {bookList.map((book) => (
        <div key={book || randomStr()}>
          {book ? (
            <DeleteAnswer bookId={book} />
          ) : (
            <div className='my-2'>
              <SearchReading onSelect={select} theme='white' />
            </div>
          )}
        </div>
      ))}
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
