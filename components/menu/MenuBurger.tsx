import { useContext } from 'react';
import AlertContext from '../../contexts/AlertContext';

interface Props {
  burgerOpen: boolean;
  setBurgerOpen: (open: boolean) => void;
}

const MenuBurger = ({ burgerOpen, setBurgerOpen }: Props) => {
  const { alert } = useContext(AlertContext);

  return (
    <div className='z-30' style={{ height: 'calc(100% - 20px)' }}>
      <button
        className={`burger${burgerOpen ? ' burger-open' : ''}${
          alert ? ' alert' : ''
        } hover:opacity-50`}
        onClick={() => setBurgerOpen(!burgerOpen)}
      >
        <div />
        <div />
        <div />
      </button>
    </div>
  );
};

export default MenuBurger;
