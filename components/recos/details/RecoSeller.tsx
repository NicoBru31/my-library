import * as React from 'react';
import { FaDotCircle } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { RecoBooksType, SellerType } from '../../../types';

const RecoSeller = ({ books, sellerId }: RecoBooksType) => {
  const { data } = useQuery<SellerType[]>('sellers');
  const seller = data?.find(({ _id }) => _id === sellerId);

  if (!seller || books.length === 0) return null;

  return (
    <div className='flex items-end'>
      <FaDotCircle className='white-fill mr-2' size={20} />
      <div>
        <a
          className='cursor-pointer text-blue-700 hover:text-red-600'
          href={seller.site}
          target='_blank'
        >
          {seller.name}
        </a>
        {' vous propose'}
      </div>
    </div>
  );
};

export default RecoSeller;
