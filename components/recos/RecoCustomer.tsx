import { Accordion } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { CustomerType } from '../../types';
import RecoItem from './RecoItem';

const RecoCustomer = () => {
  const { data } = useQuery<CustomerType>('customer');

  if (!data?.recos.length) return null;

  return (
    <Accordion>
      <div>Mes recos :</div>
      {data?.recos.map((reco) => (
        <RecoItem {...reco} key={reco._id} />
      ))}
    </Accordion>
  );
};

export default RecoCustomer;
