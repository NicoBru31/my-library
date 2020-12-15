import { motion } from 'framer-motion';
import Image from 'next/image';
import useSession from '../../hooks/useSession';
import { menuVariants } from '../../variants';
import MenuItems from './MenuItems';

interface Props {
  burgerOpen: boolean;
}

const MenuPane = ({ burgerOpen }: Props) => {
  const session = useSession();

  return (
    <motion.div
      animate={burgerOpen ? 'open' : 'closed'}
      className='menu-pane'
      initial='closed'
      transition={{ duration: 0.6 }}
      variants={menuVariants}
    >
      <div className='flex text-white text-2xl'>
        <div className='mr-2'>
          <Image alt='avatar' src='/reader.svg' height={20} width={20} />
        </div>
        <div>Je suis client</div>
      </div>
      {session?.isCustomer && <MenuItems type='customers' />}
      <div className='flex text-white text-2xl'>
        <div className='mr-2'>
          <Image alt='avatar' src='/seller.svg' height={20} width={20} />
        </div>
        <div>Je suis libraire</div>
      </div>
      {session?.isCustomer === false && <MenuItems type='sellers' />}
    </motion.div>
  );
};

export default MenuPane;
