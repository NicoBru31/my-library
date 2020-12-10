import { useEffect, useState } from 'react';
import { deleteReading, getBook, updateReading } from '../../fetch';
import { BookType, ReadingType } from '../../types';
import CardButtons from '../utils/CardButtons';
import Loading from '../utils/Loading';
import fields from './readingFields';
import ReadingPopover from './ReadingPopover';

const Reading = (props: ReadingType) => {
  const { bookId, rating, comments } = props;
  const [book, setBook] = useState<BookType>();

  useEffect(() => {
    getBook(bookId).then(setBook);
  }, [bookId]);

  return (
    <div className='reading'>
      <div className='bg-cardbg flex h-full w-full rounded'>
        <div className='text-center text-white m-auto p-4'>
          <div className='text-xl'>
            <Loading className='italic' text={book?.title} />
            <Loading className='font-bold' text={book?.author} />
          </div>
          <div>{`Note : ${rating} / 20`}</div>
          {comments.length < 20 ? (
            <div className='flex-wrap'>{`Commentaire : ${comments}`}</div>
          ) : (
            <div className='flex-wrap'>
              {`Commentaire : ${comments.split(' ').slice(0, 4).join(' ')}...`}
              <ReadingPopover comment={comments} />
            </div>
          )}
          <CardButtons
            data={props}
            field='readings'
            fields={fields}
            remove={deleteReading}
            update={updateReading}
          />
        </div>
      </div>
    </div>
  );
};

export default Reading;
