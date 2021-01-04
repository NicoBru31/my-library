import * as React from 'react';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { RecoType } from '../../types';
import RecoDetails from '../recos/details/RecoDetails';
import RecoListItem from '../recos/RecoListItem';

const SellerRecos = () => {
  const { data: recos } = useQuery<RecoType[]>('recos');

  return (
    <div>
      Les recos :
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
