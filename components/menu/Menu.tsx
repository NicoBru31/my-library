import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useState } from 'react';
import useSession from '../../hooks/useSession';
import HeaderMain from './HeaderMain';
import HeaderProfile from './HeaderProfile';
import MenuBurger from './MenuBurger';
import MenuItems from './MenuItems';

const Menu = () => {
  const { route } = useRouter();
  const session = useSession();
  const [burgerOpen, setBurgerOpen] = useState(false);

  useEffect(() => {
    setBurgerOpen(false);
  }, [route, setBurgerOpen]);

  return (
    <div className='bg-green-700 absolute h-20 w-full flex justify-between items-center pl-8 pr-8'>
      <HeaderMain />
      <HeaderProfile />
      <MenuBurger burgerOpen={burgerOpen} setBurgerOpen={setBurgerOpen} />
      <div className={`menu-pane ${burgerOpen && 'menu-open'}`}>
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
      </div>
    </div>
  );
};

export default Menu;
