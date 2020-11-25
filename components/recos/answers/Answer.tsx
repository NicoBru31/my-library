import { useEffect, useState } from 'react';
import useBooks from '../../../hooks/useBooks';
import useSellers from '../../../hooks/useSellers';
import { RecoBooksType, SellerType } from '../../../types';

const Answer = ({ books, message, sellerId }: RecoBooksType) => {
  const { data: sellers, fetchSeller } = useSellers();
  const { data, fetchBooks } = useBooks();
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
      {`"${seller?.name}" vous propose ${books
        .map((book) => {
          const found = data.find(({ _id }) => _id === book);
          if (!found) return '';
          return `"${found.title}" par ${found.author}`;
        })
        .join(', ')} et vous envoie ce message : ${message}`}
    </div>
  );
};

export default Answer;
