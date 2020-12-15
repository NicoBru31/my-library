import * as React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { GoogleBookType } from '../../types';

interface Props {
  googleBook?: GoogleBookType;
  setGoogleBook: React.Dispatch<React.SetStateAction<GoogleBookType>>;
}

const CreateReadingSelectedBook = ({ googleBook, setGoogleBook }: Props) => {
  if (!googleBook) return null;
  return (
    <div className='flex flex-wrap mt-2 mb-4'>
      <div className='italic'>{googleBook.volumeInfo.title}</div>
      <div className='mx-2'>de</div>
      <div className='font-bold'>
        {googleBook.volumeInfo.authors.join(', ')}
      </div>
      <AiOutlineCloseCircle
        className='cursor-pointer ml-2'
        color='red'
        size={20}
        onClick={() => setGoogleBook(undefined)}
      />
    </div>
  );
};

export default CreateReadingSelectedBook;
