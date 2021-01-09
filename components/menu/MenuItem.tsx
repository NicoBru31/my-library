import { motion } from 'framer-motion';
import Link from 'next/link';
import * as React from 'react';
import LoaderContext from '@/contexts/LoaderContext';
import { opacityVariants, scale } from '../../variants';
import { MenuItemProps } from './items';

interface Props extends Omit<MenuItemProps, 'match'> {
  isActive: boolean;
}

const MenuItem = ({ isActive, href, Icon, title }: Props) => {
  const { setLoader } = React.useContext(LoaderContext);

  return (
    <motion.div
      animate={isActive ? 'active' : 'default'}
      className='Link hover:opacity-50'
      initial='default'
      whileHover={scale}
      variants={opacityVariants}
    >
      {Icon}
      <Link href={href}>
        <div>
          <a onClick={() => setLoader({ isLoading: true })}>{title}</a>
        </div>
      </Link>
    </motion.div>
  );
};

export default MenuItem;
