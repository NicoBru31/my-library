import * as React from 'react';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { RecoType } from '../../types';
import RecoDetails from '../recos/details/RecoDetails';
import RecoListItem from '../recos/RecoListItem';
import SellerFilter from './SellerFilter';

const SellerRecos = () => {
  const { data } = useQuery<RecoType[]>('recos');
  const [recos, setRecos] = React.useState<RecoType[]>(data);

  return (
    <div>
      Les recos :
      <SellerFilter setRecos={setRecos} />
      <div className='hidden md:flex justify-between mx-4'>
        <div className='w-1/4'>
          {recos
            .sort((a, b) =>
              dayjs(b.createdAt).isAfter(dayjs(a.createdAt)) ? 1 : -1,
            )
            .map((reco) => (
              <RecoListItem {...reco} key={reco._id} />
            ))}
        </div>
        <RecoDetails />
      </div>
    </div>
  );
};

export default SellerRecos;
