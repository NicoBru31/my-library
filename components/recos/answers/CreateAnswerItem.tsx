import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { RiDeleteBinLine } from 'react-icons/ri';
import { getBookByGoogleId } from '../../../fetch';
import useBooks from '../../../hooks/useBooks';
import { BookType, GoogleBookType, RecoBooksType } from '../../../types';
import SearchReading from '../../readings/SearchReading';

interface Props {
  index: number;
  value: string;
}

const CreateAnswerItem = ({ index, value }: Props) => {
  const { data } = useBooks();
  const [book, setBook] = useState<BookType>();
  const { getValues, setValue } = useFormContext<RecoBooksType>();

  const select = async (googleBook: GoogleBookType) => {
    const fetchedBook = await getBookByGoogleId(googleBook.id);
    setBook(fetchedBook);
    setValue('books', [...getValues('books'), fetchedBook._id]);
  };

  const unselect = (bookId: string) => {
    setValue(
      'books',
      getValues('books').filter((id) => id !== bookId),
    );
  };

  useEffect(() => {
    if (!book) setBook(data.find(({ _id }) => _id === value));
  }, [book, data, value]);

  return (
    <div>
      <div>{`Proposition n°${index + 1}`}</div>
      {book ? (
        <div className='flex justify-start items-center'>
          <div className='italic'>{book.title}</div>
          <div className='px-2'>{`par ${book.author}`}</div>
          <RiDeleteBinLine
            className='cursor-pointer hover:opacity-50'
            color='red'
            onClick={() => {
              unselect(value);
              setBook(undefined);
            }}
          />
        </div>
      ) : (
        <SearchReading onSelect={select} />
      )}
    </div>
  );
};

export default CreateAnswerItem;
