import { Accordion } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { CustomerType } from '../../types';
import RecoItem from './RecoItem';

const RecoCustomer = () => {
  const { data } = useQuery<CustomerType>('customer');

  if (!data?.recos.length) return null;

  return (
    <>
      <div>Mes recos :</div>
      <Accordion allowToggle>
        {data?.recos
          .sort((a, b) =>
            dayjs(b.createdAt).isAfter(dayjs(a.createdAt)) ? 1 : -1,
          )
          .map((reco) => (
            <RecoItem {...reco} key={reco._id} />
          ))}
      </Accordion>
    </>
  );
};

export default RecoCustomer;
