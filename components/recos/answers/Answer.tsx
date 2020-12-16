import { UnorderedList } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { RecoBooksType, SellerType } from '../../../types';
import AnswerBook from './AnswerBook';

const Answer = ({ books, message, sellerId }: RecoBooksType) => {
  const { data: sellers } = useQuery<SellerType[]>('sellers');
  const [seller, setSeller] = useState<SellerType>();

  useEffect(() => {
    const found = sellers?.find(({ _id }) => _id === sellerId);
    if (found) setSeller(found);
  }, [sellers, sellerId, setSeller]);

  return (
    <div>
      {`"${seller?.name}" vous propose :`}
      <UnorderedList>
        {books.map((book) => (
          <AnswerBook key={book} bookId={book} />
        ))}
      </UnorderedList>
      <div>
        Message du libraire : <span className='italic'>{message}</span>
      </div>
    </div>
  );
};

export default Answer;
