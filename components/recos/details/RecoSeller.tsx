import * as React from 'react';
import { FaDotCircle } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { RecoBooksType, SellerType } from '../../../types';

const RecoSeller = ({ sellerId }: RecoBooksType) => {
  const { data } = useQuery<SellerType[]>('sellers');
  const seller = data?.find(({ _id }) => _id === sellerId);

  if (!seller) return;

  return (
    <div className='flex items-end'>
      <FaDotCircle className='white-fill mr-2' size={20} />
      <div>{`"${seller.name}" vous propose`}</div>
    </div>
  );
};

export default RecoSeller;
