import { UnorderedList } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useBooks from '../../../hooks/useBooks';
import useSellers from '../../../hooks/useSellers';
import { RecoBooksType, SellerType } from '../../../types';
import AnswerBook from './AnswerBook';

const Answer = ({ books, message, sellerId }: RecoBooksType) => {
  const { data: sellers, fetchSeller } = useSellers();
  const { fetchBooks } = useBooks();
  const [seller, setSeller] = useState<SellerType>();

  useEffect(() => {
    fetchBooks(...books);
  }, [books]);

  useEffect(() => {
    const found = sellers.find(({ _id }) => _id === sellerId);
    if (!found) fetchSeller(sellerId);
    else setSeller(found);
  }, [sellers, fetchSeller, sellerId, setSeller]);

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
