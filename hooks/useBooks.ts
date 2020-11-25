import { queryCache, useQuery } from 'react-query';
import { getBook } from '../fetch';
import { BookType } from '../types';

const useBooks = () => {
  const { data } = useQuery<BookType[]>('books', { initialData: [] });

  const fetchBooks = (...books: string[]) =>
    Promise.all(books.map(getBook)).then((fetched) =>
      queryCache.setQueryData<BookType[]>('books', (oldData) => [
        ...fetched,
        ...oldData,
      ]),
    );

  return { data, fetchBooks };
};

export default useBooks;
