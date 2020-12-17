import { ExpandedIndex } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import RecoContext from '../../contexts/RecoContext';
import { patchReco } from '../../fetch';
import useWindowSize from '../../hooks/useWindowSize';
import { CustomerType } from '../../types';
import { slide } from '../../variants';
import RecoDetails from './details/RecoDetails';
import RecoListItem from './RecoListItem';

const RecoCustomer = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery<CustomerType>('customer');
  const { width } = useWindowSize();
  const { reco } = useContext(RecoContext);

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
      <div className='flex justify-between mx-4'>
        <motion.div
          animate={reco ? 'hidden' : 'shown'}
          initial={width > 768 ? 'hidden' : 'shown'}
          style={{ pointerEvents: reco && width < 768 ? 'none' : 'auto' }}
          variants={slide(width > 768 ? '25%' : '100%')}
        >
          {data?.recos
            .sort((a, b) =>
              dayjs(b.createdAt).isAfter(dayjs(a.createdAt)) ? 1 : -1,
            )
            .map((reco) => (
              <RecoListItem {...reco} key={reco._id} />
            ))}
        </motion.div>
        <RecoDetails />
      </div>
    </div>
  );
};

export default RecoCustomer;
