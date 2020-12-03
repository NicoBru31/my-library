import Image from 'next/image';
import useSession from '../../hooks/useSession';
import MenuItems from './MenuItems';

interface Props {
  burgerOpen: boolean;
}

const MenuPane = ({ burgerOpen }: Props) => {
  const session = useSession();

  return (
    <div className={`menu-pane${burgerOpen ? ' menu-open' : ''}`}>
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
  );
};

export default MenuPane;
