import * as React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import RecoContext from '@/contexts/RecoContext';
import Book from '../../books/Book';

interface Props {
  bookId: string;
}

const DeleteAnswer = ({ bookId }: Props) => {
  const { setAnswer } = React.useContext(RecoContext);

  const remove = () =>
    setAnswer((answer) => ({
      ...answer,
      books: answer.books.filter((book) => book !== bookId),
    }));

  return (
    <div className='flex justify-start'>
      <Book bookId={bookId} key={bookId} />
      <AiFillDelete
        className='cursor-pointer ml-2 hover:opacity-50'
        color='white'
        onClick={remove}
        size={20}
      />
    </div>
  );
};

export default DeleteAnswer;
