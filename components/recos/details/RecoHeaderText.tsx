import useNotifMessage from '@/hooks/useNotifMessage';
import useSession from '@/hooks/useSession';
import { RecoType } from '@/types/index';
import dayjs from 'dayjs';
import * as React from 'react';
import { GrAlert } from 'react-icons/gr';

const RecoHeaderText = ({ answers, createdAt, name, notified }: RecoType) => {
  const session = useSession();
  const notif = useNotifMessage(answers);

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
      <div>{notif}</div>
    </div>
  );
};

export default RecoHeaderText;
