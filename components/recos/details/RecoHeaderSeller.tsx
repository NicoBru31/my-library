import dayjs from 'dayjs';
import * as React from 'react';
import { GrAlert } from 'react-icons/gr';
import useSession from '../../../hooks/useSession';
import { RecoType } from '../../../types';

const RecoHeaderSeller = ({ answers, createdAt, name, notified }: RecoType) => {
  const session = useSession();
  const responses = answers
    ?.filter(({ sellerId }) => sellerId === session?.id)
    ?.reduce((f, answer) => f - answer.books.length, 2);
  const plural = responses > 1;

  return (
    <div className='ml-4'>
      <div className='flex items-center'>
        <div>
          {name || `Reco créée le ${dayjs(createdAt).format('DD-MM-YYYY')}`}
        </div>
        {!notified?.includes(session?.id) && (
          <GrAlert className='ml-2 white-stroke' />
        )}
      </div>
      <div>{`Il vous reste ${responses} réponse${
        plural ? 's' : ''
      } à envoyer`}</div>
    </div>
  );
};

export default RecoHeaderSeller;
