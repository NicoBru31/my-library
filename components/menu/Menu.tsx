import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
        <div className='Link'>
          <Link href={session?.id ? `/customers/${session.id}` : '/login'}>
            Je suis client
          </Link>
        </div>
        {session?.isCustomer && <MenuItems type='customers' />}
        <div className='Link'>
          <Link
            href={
              session?.id ? `/sellers/${session.id}` : '/login?isSeller=true'
            }
          >
            Je suis libraire
          </Link>
        </div>
        {session?.isCustomer === false && <MenuItems type='sellers' />}
      </div>
    </div>
  );
};

export default Menu;
