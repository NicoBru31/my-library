import RecoContext from '@/contexts/RecoContext';
import { RecoType } from '@/types/index';
import * as React from 'react';
import { AiFillIdcard } from 'react-icons/ai';
import { GrFormClose } from 'react-icons/gr';
import RecoHeaderText from './RecoHeaderText';

interface Props extends RecoType {
  withClose?: boolean;
}

const RecoHeader = ({ withClose, ...props }: Props) => {
  const { changeReco } = React.useContext(RecoContext);

  const close = () => changeReco(undefined);

  return (
    <div className='flex justify-between'>
      <div className='items-center text-white p-2 flex'>
        <AiFillIdcard size={60} color='white' />
        <RecoHeaderText {...props} />
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
