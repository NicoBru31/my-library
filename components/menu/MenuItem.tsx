import { motion } from 'framer-motion';
import Link from 'next/link';
import * as React from 'react';
import { scale } from '../../variants';
import { MenuItemProps } from './items';

interface Props extends Omit<MenuItemProps, 'match'> {
  isActive: boolean;
}

const MenuItem = ({ isActive, href, Icon, title }: Props) => (
  <motion.div
    className={`Link${isActive ? ' opacity-50' : ''} hover:opacity-50`}
    whileHover={scale}
  >
    {Icon}
    <Link href={href}>{title}</Link>
  </motion.div>
);

export default MenuItem;
