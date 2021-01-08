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
      <div>
        {name || `Reco créée le ${dayjs(createdAt).format('DD-MM-YYYY')}`}
      </div>
      <div>{`${responses} réponse${plural ? 's' : ''} reçue${
        plural ? 's' : ''
      }`}</div>
      {!notified?.includes(id) && <GrAlert className='white-stroke' />}
    </div>
  );
};

export default RecoHeaderCustomer;
