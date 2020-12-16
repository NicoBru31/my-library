import * as React from 'react';
import { useQuery } from 'react-query';
import { ReadingType, RecoType } from '../../types';

const RecoReadings = ({ from }: RecoType) => {
  const { data } = useQuery<ReadingType[]>('readings');

  return (
    <div>
      <div className='font-bold'>Les lectures du client :</div>
      <ul>
        {data
          .filter(({ _id }) => from?.readings.includes(_id))
          .map((reading) => (
            <li className='flex' key={reading._id}>
              <div className='italic'>{reading.book.title}</div>
              <div className='mx-2'>de</div>
              <div className='font-bold'>{reading.book.author}</div>
              <div className='ml-2'>{`note : ${reading.rating}/20`}</div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RecoReadings;
