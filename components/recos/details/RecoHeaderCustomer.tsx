import dayjs from 'dayjs';
import * as React from 'react';
import { GrAlert } from 'react-icons/gr';
import useSession from '../../../hooks/useSession';
import { RecoType } from '../../../types';

const RecoHeaderCustomer = ({
  answers,
  createdAt,
  name,
  notified,
}: RecoType) => {
  const { id } = useSession();
  const responses = answers?.reduce((f, e) => f + e.books.length, 0);
  const plural = responses > 1;

  return (
    <div className='ml-4'>
      <div className='flex items-center'>
        <div>
          {name || `Reco créée le ${dayjs(createdAt).format('DD-MM-YYYY')}`}
        </div>
        {!notified?.includes(id) && <GrAlert className='ml-2 white-stroke' />}
      </div>
      <div>{`${responses} réponse${plural ? 's' : ''} reçue${
        plural ? 's' : ''
      }`}</div>
    </div>
  );
};

export default RecoHeaderCustomer;
