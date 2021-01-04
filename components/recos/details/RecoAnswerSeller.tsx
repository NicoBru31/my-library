import * as React from 'react';
import { RecoBooksType } from '../../../types';
import SearchReading from '../../readings/SearchReading';
import DeleteAnswer from '../answers/DeleteAnswer';
// TODO : SearchReading for Sellers and write message
const RecoAnswerSeller = ({ books }: RecoBooksType) => (
  <div className='w-full md:w-3/4'>
    {books[0] ? (
      <DeleteAnswer bookId={books[0]} />
    ) : (
      <SearchReading onSelect={() => {}} />
    )}
    {books[1] ? (
      <DeleteAnswer bookId={books[1]} />
    ) : (
      <SearchReading onSelect={() => {}} />
    )}
  </div>
);

export default RecoAnswerSeller;
