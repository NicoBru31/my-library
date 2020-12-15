import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
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
          <Image
            alt='avatar lecteur'
            src='/reader.svg'
            height={20}
            width={20}
          />
        </div>
        <div className='Link'>
          {!session?.isCustomer ? (
            <Link href='/login'>Je suis un lecteur</Link>
          ) : (
            <div className='cursor-default'>Je suis un lecteur</div>
          )}
        </div>
      </div>
      {session?.isCustomer && <MenuItems type='customers' />}
      <div className='flex text-white text-2xl'>
        <div className='mr-2'>
          <Image
            alt='avatar libraire'
            src='/seller.svg'
            height={20}
            width={20}
          />
        </div>
        <div className='Link'>
          {session?.isCustomer ? (
            <Link href='/login?isSeller=true'>Je suis un libraire</Link>
          ) : (
            <div className='cursor-default'>Je suis un libraire</div>
          )}
        </div>
      </div>
      {session?.isCustomer === false && <MenuItems type='sellers' />}
    </motion.div>
  );
};

export default MenuPane;
