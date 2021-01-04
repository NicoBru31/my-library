import { motion } from 'framer-motion';
import * as React from 'react';
import RecoContext from '../../contexts/RecoContext';
import { RecoType } from '../../types';
import { opacityVariants, scaleShake } from '../../variants';
import RecoHeader from './details/RecoHeader';

const RecoListItem = (props: RecoType) => {
  const { reco, changeReco } = React.useContext(RecoContext);

  const updateReco = () => changeReco(props);

  return (
    <motion.div
      animate={reco?._id === props._id ? 'active' : 'default'}
      className='rounded cursor-pointer bg-green-800 shadow-2xl my-4'
      initial='default'
      onClick={updateReco}
      variants={opacityVariants}
      whileHover={reco?._id !== props._id && scaleShake}
    >
      <RecoHeader {...props} />
    </motion.div>
  );
};

export default RecoListItem;
