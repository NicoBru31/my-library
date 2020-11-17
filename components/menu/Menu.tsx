import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import useSession from '../../hooks/useSession';

const Menu = () => {
  const { route } = useRouter();
  const session = useSession();
  const [burgerOpen, setBurgerOpen] = useState(false);

  useEffect(() => {
    setBurgerOpen(false);
  }, [route, setBurgerOpen]);

  return (
    <>
      <button
        className={`burger ${burgerOpen && 'burger-open'}`}
        onClick={() => setBurgerOpen(!burgerOpen)}
      >
        <div />
        <div />
        <div />
      </button>
      <div className={`menu-pane ${burgerOpen && 'menu-open'}`}>
        <div className='Link'>
          <Link href='/customerss'>Je suis client</Link>
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
    </>
  );
};

export default Menu;
