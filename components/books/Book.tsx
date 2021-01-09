import * as React from 'react';
import { useQuery } from 'react-query';
import { BookType } from '@/types/index';

interface Props {
  bookId: string;
}

const Book = ({ bookId }: Props) => {
  const { data } = useQuery<BookType[]>('books');
  const book = data?.find(({ _id }) => _id === bookId);

  if (!book) return null;

  return (
    <div className='flex justify-start text-white'>
      <div className='italic'>{book.title}</div>
      <div className='mx-2'>de</div>
      <div className='font-bold'>{book.author}</div>
    </div>
  );
};

export default Book;
