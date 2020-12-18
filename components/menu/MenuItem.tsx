import { motion } from 'framer-motion';
import Link from 'next/link';
import * as React from 'react';
import LoaderContext from '../../contexts/LoaderContext';
import { scale } from '../../variants';
import { MenuItemProps } from './items';

interface Props extends Omit<MenuItemProps, 'match'> {
  isActive: boolean;
}

const MenuItem = ({ isActive, href, Icon, title }: Props) => {
  const { setLoader } = React.useContext(LoaderContext);

  return (
    <motion.div
      className={`Link${isActive ? ' opacity-50' : ''} hover:opacity-50`}
      whileHover={scale}
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
