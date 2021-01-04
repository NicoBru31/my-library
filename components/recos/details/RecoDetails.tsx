import { motion } from 'framer-motion';
import * as React from 'react';
import RecoContext from '../../../contexts/RecoContext';
import useWindowSize from '../../../hooks/useWindowSize';
import { hidden, slideRight, slideRightMd } from '../../../variants';
import RecoAnswers from './RecoAnswers';
import RecoHeader from './RecoHeader';

const RecoDetails = () => {
  const [animate, setAnimate] = React.useState<'hidden' | 'shown'>('hidden');
  const { reco } = React.useContext(RecoContext);
  const { width } = useWindowSize();

  React.useEffect(() => {
    if (reco) setAnimate('shown');
    else setAnimate('hidden');
  }, [reco, setAnimate]);

  return (
    <motion.div
      animate={animate}
      className='relative md:w-2/3'
      initial='hidden'
      style={{ height: 'fit-content' }}
      variants={width < 768 ? slideRight : slideRightMd}
    >
      <motion.div
        animate={animate}
        className='bg-green-800 rounded h-0 my-4 w-full'
        initial='hidden'
        variants={hidden}
      >
        {animate === 'shown' && (
          <>
            <RecoHeader {...reco} withClose />
            <RecoAnswers {...reco} />
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default RecoDetails;
