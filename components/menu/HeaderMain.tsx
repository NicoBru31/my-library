import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { GiBookshelf } from 'react-icons/gi';
import { scale } from '../../variants';

const HeaderMain = () => {
  const { push } = useRouter();

  const goRoot = () => push({ pathname: '/' });

  return (
    <motion.div
      className='flex items-baseline cursor-pointer hover:opacity-50'
      onClick={goRoot}
      whileHover={scale}
    >
      <GiBookshelf color='white' size='40px' />
      <div className='font-bold text-white pl-4 pr-4 text-3xl'>LIBER</div>
      <div className='text-white hidden md:block'>
        La plateforme de vos librairies
      </div>
    </motion.div>
  );
};

export default HeaderMain;
