import Link from 'next/link';
import { RiAccountCircleLine } from 'react-icons/ri';
import { FaRegAddressCard } from 'react-icons/fa';
import { BiBookHeart } from 'react-icons/bi';
import { CgUserList } from 'react-icons/cg';
import useSession from '../../hooks/useSession';
import { useRouter } from 'next/router';

interface Props {
  type: 'customers' | 'sellers';
}

const MenuItems = ({ type }: Props) => {
  const session = useSession();
  const { route } = useRouter();

  if (!session.id) return null;

  return (
    <div className='pl-6 mb-6'>
      <div className={`Link ${route.includes('update') && 'opacity-50'}`}>
        <RiAccountCircleLine className='mr-2' height={20} width={20} />
        <Link href={`/${type}/update/${session.id}`}>Mon compte</Link>
      </div>
      <div className={`Link ${route.includes('addresses') && 'opacity-50'}`}>
        <FaRegAddressCard className='mr-2' height={20} width={20} />
        <Link href={`/${type}/addresses/${session.id}`}>Mes adresses</Link>
      </div>
      {type === 'customers' && (
        <>
          <div
            className={`Link ${
              route.match(/\/customers\/\[id\]$/) && 'opacity-50'
            }`}
          >
            <BiBookHeart className='mr-2' height={20} width={20} />
            <Link href={`/${type}/${session.id}`}>Mes lectures</Link>
          </div>
          <div className={`Link ${route.includes('recos') && 'opacity-50'}`}>
            <CgUserList className='mr-2' height={20} width={20} />
            <Link href={`/${type}/recos/${session.id}`}>Mes recos</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default MenuItems;
