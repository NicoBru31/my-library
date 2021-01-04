import * as React from 'react';
import { AiFillIdcard } from 'react-icons/ai';
import { GrFormClose } from 'react-icons/gr';
import RecoContext from '../../../contexts/RecoContext';
import useSession from '../../../hooks/useSession';
import { RecoType } from '../../../types';
import RecoHeaderCustomer from './RecoHeaderCustomer';
import RecoHeaderSeller from './RecoHeaderSeller';

interface Props extends RecoType {
  withClose?: boolean;
}

const RecoHeader = ({ withClose, ...props }: Props) => {
  const session = useSession();
  const { changeReco } = React.useContext(RecoContext);

  const close = () => changeReco(undefined);

  return (
    <div className='flex justify-between'>
      <div className='items-center text-white p-2 flex'>
        <AiFillIdcard size={60} color='white' />
        {session?.isCustomer ? (
          <RecoHeaderCustomer {...props} />
        ) : (
          <RecoHeaderSeller {...props} />
        )}
      </div>
      {withClose && (
        <GrFormClose
          className='white-stroke mr-4 mt-4 cursor-pointer hover:opacity-50'
          onClick={close}
          size={40}
        />
      )}
    </div>
  );
};

export default RecoHeader;
