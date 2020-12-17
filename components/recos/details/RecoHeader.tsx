import dayjs from 'dayjs';
import * as React from 'react';
import { AiFillIdcard } from 'react-icons/ai';
import { GrAlert, GrFormClose } from 'react-icons/gr';
import { useQuery } from 'react-query';
import RecoContext from '../../../contexts/RecoContext';
import { CustomerType, RecoType } from '../../../types';

interface Props extends RecoType {
  withClose?: boolean;
}

const RecoHeader = ({
  answers = [],
  createdAt,
  notified,
  withClose,
}: Props) => {
  const { data } = useQuery<CustomerType>('customer');
  const plural = answers.length > 1;
  const { setReco } = React.useContext(RecoContext);

  const close = () => setReco(undefined);

  return (
    <div className='flex justify-between'>
      <div className='items-center text-white p-2 flex'>
        <AiFillIdcard size={60} color='white' />
        <div className='ml-4'>
          <div>{`Reco créée le ${dayjs(createdAt).format('DD-MM-YYYY')}`}</div>
          <div>{`${answers.length} réponse${plural ? 's' : ''} reçue${
            plural ? 's' : ''
          }`}</div>
          {!notified?.includes(data._id) && (
            <GrAlert className='white-stroke' />
          )}
        </div>
      </div>
      {withClose && (
        <GrFormClose
          className='white-stroke mr-4 mt-4 cursor-pointer'
          onClick={close}
          size={40}
        />
      )}
    </div>
  );
};

export default RecoHeader;
