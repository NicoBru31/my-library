import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { GiBookshelf } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';
import AlertContext from '../../contexts/AlertContext';
import useSession from '../../hooks/useSession';

const Menu = () => {
  const { push, route } = useRouter();
  const session = useSession();
  const [burgerOpen, setBurgerOpen] = useState(false);
  const { alert } = useContext(AlertContext);

  const goProfile = () => {
    if (!session.id) push({ pathname: '/login' });
    else if (session.isCustomer) push({ pathname: `/customers/${session.id}` });
    else if (!session.isCustomer) push({ pathname: `/sellers/${session.id}` });
  };

  const goRoot = () => push({ pathname: '/' });

  useEffect(() => {
    setBurgerOpen(false);
  }, [route, setBurgerOpen]);

  return (
    <div className='bg-green-700 absolute h-20 w-full flex justify-between items-center pl-8 pr-8'>
      <div
        className='flex items-baseline cursor-pointer hover:opacity-50'
        onClick={goRoot}
      >
        <GiBookshelf color='white' size='40px' />
        <div className='font-bold text-white pl-4 pr-4 text-3xl'>LIBER</div>
        <div className='text-white'>La plateforme de vos librairies</div>
      </div>
      <div
        className='flex items-center cursor-pointer hover:opacity-50'
        onClick={goProfile}
      >
        <CgProfile color='white' size='40px' />
        <div className='text-white pl-4'>{`${session?.fullName || ''}`}</div>
      </div>
      <div style={{ height: 'calc(100% - 20px)' }}>
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
      <div className={`menu-pane ${burgerOpen && 'menu-open'}`}>
        <div className='Link'>
          <Link href='/customers'>Je suis client</Link>
        </div>
        {session?.isCustomer && (
          <div className='pl-6'>
            <div className='Link'>
              <Link href={`/customers/update/${session.id}`}>Mon compte</Link>
            </div>
            <div className='Link'>
              <Link href={`/customers/addresses/${session.id}`}>
                Mes adresses
              </Link>
            </div>
            <div className='Link'>
              <Link href={`/customers/${session.id}`}>Mes lectures</Link>
            </div>
          </div>
        )}
        <div className='Link'>
          <Link href='/sellers'>Je suis libraire</Link>
        </div>
        {session?.isCustomer === false && (
          <div className='pl-6'>
            <div className='Link'>
              <Link href={`/sellers/update/${session.id}`}>Mon compte</Link>
            </div>
            <div className='Link'>
              <Link href={`/sellers/addresses/${session.id}`}>
                Mes adresses
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
