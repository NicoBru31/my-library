import { useRouter } from 'next/router';
import * as React from 'react';
import HeaderMain from './HeaderMain';
import HeaderProfile from './HeaderProfile';
import MenuBurger from './MenuBurger';
import MenuPane from './MenuPane';

const Menu = () => {
  const { route } = useRouter();
  const [burgerOpen, setBurgerOpen] = React.useState(false);

  React.useEffect(() => {
    setBurgerOpen(false);
  }, [route, setBurgerOpen]);

  return (
    <div className='bg-green-700 absolute h-20 w-full flex justify-between items-center pl-4 pr-12 md:pl-12 md:pr-8'>
      <HeaderMain />
      <HeaderProfile />
      <MenuBurger burgerOpen={burgerOpen} setBurgerOpen={setBurgerOpen} />
      <MenuPane burgerOpen={burgerOpen} />
    </div>
  );
};

export default Menu;
