import { useEffect, useState } from 'react';
import { getBook, getGoogleBook } from '../../fetch';
import { BookType, GoogleBookType, ReadingType } from '../../types';

const Reading = ({ bookId, comments, rating }: ReadingType) => {
  const [gBook, setGBook] = useState<GoogleBookType>();
  const [book, setBook] = useState<BookType>();

  useEffect(() => {
    getBook(bookId).then(setBook);
  }, [bookId]);

  useEffect(() => {
    book?.googleId && getGoogleBook(book.googleId).then(setGBook);
  }, [book, setGBook]);

  return (
    <div
      className='flex h-56 w-1/4 m-8'
      style={{
        backgroundImage: `url(${gBook?.volumeInfo?.imageLinks?.thumbnail})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className='bg-cardbg flex h-full w-full'>
        <div className='text-center text-white m-auto p-4'>
          <div className='text-xl'>
            <div className='italic'>{book?.title}</div>
            {` par ${book?.author}`}
          </div>
          <div>{`Note : ${rating} / 20`}</div>
          <div className='flex-wrap'>{`Commentaires : ${comments}`}</div>
        </div>
      </div>
    </div>
  );
};

export default Reading;
