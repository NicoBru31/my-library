import { motion } from 'framer-motion';
import * as React from 'react';
import RecoContext from '../../../contexts/RecoContext';
import useWindowSize from '../../../hooks/useWindowSize';
import { hidden, slide } from '../../../variants';
import RecoAnswers from './RecoAnswers';
import RecoHeader from './RecoHeader';

const RecoDetails = () => {
  const [animate, setAnimate] = React.useState<'hidden' | 'shown'>('hidden');
  const { reco } = React.useContext(RecoContext);
  const { width } = useWindowSize();

  React.useEffect(() => {
    if (reco) setAnimate('shown');
    else setAnimate('hidden');
  }, [reco]);

  return (
    <motion.div
      animate={animate}
      initial={width < 768 ? 'hidden' : 'shown'}
      style={{ height: 'fit-content' }}
      variants={slide(width > 768 ? '67%' : '100%')}
    >
      <motion.div
        animate={animate}
        className='bg-green-800 w-0 rounded h-0 my-4'
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
