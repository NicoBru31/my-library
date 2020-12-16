import { Accordion, ExpandedIndex } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useQuery, useQueryClient } from 'react-query';
import { patchReco } from '../../fetch';
import { CustomerType } from '../../types';
import RecoItem from './RecoItem';

const RecoCustomer = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery<CustomerType>('customer');

  if (!data?.recos.length) return null;

  const sendIsNotified = (index: ExpandedIndex) => {
    if (typeof index === 'number') {
      index >= 0 &&
        patchReco(data._id, data.recos[index]._id).then(({ notified }) =>
          queryClient.setQueryData<CustomerType>('customer', () => ({
            ...data,
            recos: data.recos.map((reco, i) =>
              i === index ? { ...reco, notified } : reco,
            ),
          })),
        );
    } else index.forEach(sendIsNotified);
  };

  return (
    <div className='px-4'>
      <div>Mes recos :</div>
      <Accordion allowToggle onChange={sendIsNotified}>
        {data?.recos
          .sort((a, b) =>
            dayjs(b.createdAt).isAfter(dayjs(a.createdAt)) ? 1 : -1,
          )
          .map((reco) => (
            <RecoItem {...reco} key={reco._id} />
          ))}
      </Accordion>
    </div>
  );
};

export default RecoCustomer;
