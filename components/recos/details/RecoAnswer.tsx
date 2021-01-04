import * as React from 'react';
import { GoPrimitiveDot } from 'react-icons/go';
import useWindowSize from '../../../hooks/useWindowSize';
import { RecoBooksType } from '../../../types';
import Book from '../../utils/Book';
import PopoverText from '../../utils/PopoverText';
import RecoSeller from './RecoSeller';

const RecoAnswer = (answer: RecoBooksType) => {
  const { width } = useWindowSize();

  return (
    <div className='w-full md:w-3/4'>
      <RecoSeller {...answer} />
      {answer.books.map((book) => (
        <div
          className='border-l-2 border-white flex items-center py-2'
          key={book}
          style={{ marginLeft: '0.55rem' }}
        >
          <GoPrimitiveDot
            className='svg-fill mr-2'
            size={20}
            style={{ marginLeft: '-0.7rem' }}
          />
          <Book bookId={book} />
        </div>
      ))}
      {width < 768 && (
        <PopoverText
          full={answer.message}
          headerText='Message du libraire'
          trigger='Voir le message du libraire'
        />
      )}
    </div>
  );
};

export default RecoAnswer;
