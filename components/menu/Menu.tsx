import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import HeaderMain from './HeaderMain';
import HeaderProfile from './HeaderProfile';
import MenuBurger from './MenuBurger';
import MenuPane from './MenuPane';

const Menu = () => {
  const { route } = useRouter();
  const [burgerOpen, setBurgerOpen] = useState(false);

  useEffect(() => {
    setBurgerOpen(false);
  }, [route, setBurgerOpen]);

  return (
    <div className='bg-green-700 absolute h-20 w-full flex justify-between items-center pl-12 pr-8'>
      <HeaderMain />
      <HeaderProfile />
      <MenuBurger burgerOpen={burgerOpen} setBurgerOpen={setBurgerOpen} />
      <MenuPane burgerOpen={burgerOpen} />
    </div>
  );
};

export default Menu;
