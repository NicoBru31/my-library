import { ListItem, Skeleton } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { BookType } from '../../../types';

interface Props {
  bookId: string;
}

const AnswerBook = ({ bookId }: Props) => {
  const { data } = useQuery<BookType[]>('books');
  const found = data.find(({ _id }) => _id === bookId);

  return (
    <ListItem>
      <Skeleton className='flex justify-start' isLoaded={found !== undefined}>
        <div className='italic'>{found?.title}</div>
        <div className='mx-2'>{' de '}</div>
        <div className='font-bold'>{found?.author}</div>
      </Skeleton>
    </ListItem>
  );
};

export default AnswerBook;
