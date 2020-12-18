import { motion } from 'framer-motion';
import * as React from 'react';
import RecoContext from '../../contexts/RecoContext';
import { RecoType } from '../../types';
import { opacityVariants, scaleShake } from '../../variants';
import RecoHeader from './details/RecoHeader';

const RecoListItem = (props: RecoType) => {
  const { reco, setReco } = React.useContext(RecoContext);

  const changeReco = () => setReco(props);

  return (
    <motion.div
      animate={reco?._id === props._id ? 'active' : 'default'}
      className='rounded cursor-pointer bg-green-800 shadow-2xl my-4'
      initial='default'
      onClick={changeReco}
      variants={opacityVariants}
      whileHover={reco?._id !== props._id && scaleShake}
    >
      <RecoHeader {...props} />
    </motion.div>
  );
};

export default RecoListItem;
