import { useQuery, useQueryClient } from 'react-query';
import { getBook } from '../fetch';
import { BookType } from '../types';

const useBooks = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery<BookType[]>('books');

  const fetchBooks = (...books: string[]) =>
    Promise.all(
      books
        .filter((id) => id !== '' && !data?.find(({ _id }) => _id === id))
        .map(getBook),
    ).then((fetched) =>
      queryClient.setQueryData<BookType[]>('books', (oldData) => [
        ...fetched,
        ...oldData,
      ]),
    );

  return { data, fetchBooks };
};

export default useBooks;
