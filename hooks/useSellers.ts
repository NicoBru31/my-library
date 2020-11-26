import { queryCache, useQuery } from 'react-query';
import { getSeller } from '../fetch';
import { SellerType } from '../types';

const useSellers = () => {
  const { data } = useQuery<SellerType[]>('sellers', { initialData: [] });

  const fetchSeller = (sellerId: string) =>
    getSeller(window.location.origin, sellerId).then((newSeller) =>
      queryCache.setQueryData<SellerType[]>('sellers', (sellers) => [
        newSeller,
        ...sellers,
      ]),
    );

  return { data, fetchSeller };
};

export default useSellers;
