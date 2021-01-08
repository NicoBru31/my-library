import { List, ListItem } from '@chakra-ui/react';
import * as React from 'react';
import { FaDotCircle } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { ReadingType } from '../../../types';
import Book from '../../utils/Book';

const RecoFrom = () => {
  const { data } = useQuery<ReadingType[]>('readings');

  return (
    <div className='mb-4'>
      <div className='text-white mb-2'>
        Lectures sélectionnées pour cette reco :
      </div>
      <List spacing={3}>
        {data?.map(({ _id, bookId, rating }) => (
          <ListItem className='flex' key={_id}>
            <FaDotCircle className='mr-2' size={20} color='white' />
            <Book bookId={bookId} />
            <div className='ml-2'>{`${rating} / 20`}</div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RecoFrom;
