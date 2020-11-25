import Link from 'next/link';
import useSession from '../../hooks/useSession';

interface Props {
  type: 'customers' | 'sellers';
}

const MenuItems = ({ type }: Props) => {
  const session = useSession();

  if (!session.id) return null;

  return (
    <div className='pl-6'>
      <div className='Link'>
        <Link href={`/${type}/update/${session.id}`}>Mon compte</Link>
      </div>
      <div className='Link'>
        <Link href={`/${type}/addresses/${session.id}`}>Mes adresses</Link>
      </div>
      {type === 'customers' && (
        <>
          <div className='Link'>
            <Link href={`/${type}/${session.id}`}>Mes lectures</Link>
          </div>
          <div className='Link'>
            <Link href={`/${type}/recos/${session.id}`}>Mes recos</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default MenuItems;
