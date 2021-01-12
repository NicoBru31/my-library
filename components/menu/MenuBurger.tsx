import { motion } from 'framer-motion';
import * as React from 'react';
import AlertContext from '@/contexts/AlertContext';
import { scale } from '../../variants';

interface Props {
  burgerOpen: boolean;
  setBurgerOpen: (open: boolean) => void;
}

const MenuBurger = ({ burgerOpen, setBurgerOpen }: Props) => {
  const { alert } = React.useContext(AlertContext);

  return (
    <div className='z-30' style={{ height: 'calc(100% - 20px)' }}>
      <motion.button
        className={`burger${burgerOpen ? ' burger-open' : ''}${
          alert ? ' alert' : ''
        } hover:opacity-50`}
        onClick={() => setBurgerOpen(!burgerOpen)}
        whileHover={scale}
      >
        <div />
        <div />
        <div />
      </motion.button>
    </div>
  );
};

export default MenuBurger;
