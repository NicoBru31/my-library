import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import RecoContext from '../../contexts/RecoContext';
import { CustomerType } from '../../types';
import { slideLeft } from '../../variants';
import RecoDetails from './details/RecoDetails';
import RecoListItem from './RecoListItem';

const RecoCustomer = () => {
  const { data } = useQuery<CustomerType>('customer');
  const { reco } = useContext(RecoContext);

  if (!data?.recos.length) return null;

  return (
    <div className='px-4'>
      <div>Mes recos :</div>
      <div className='hidden md:flex justify-between mx-4'>
        <div className='w-1/4'>
          {data?.recos
            .sort((a, b) =>
              dayjs(b.createdAt).isAfter(dayjs(a.createdAt)) ? 1 : -1,
            )
            .map((reco) => (
              <RecoListItem {...reco} key={reco._id} />
            ))}
        </div>
        <RecoDetails />
      </div>
      <div className='md:hidden flex justify-between mx-4'>
        <motion.div
          animate={reco ? 'hidden' : 'shown'}
          className='relative'
          initial='shown'
          variants={slideLeft}
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
