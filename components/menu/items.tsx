import { BiBookHeart } from 'react-icons/bi';
import { CgUserList } from 'react-icons/cg';
import { FaRegAddressCard } from 'react-icons/fa';
import { RiAccountCircleLine } from 'react-icons/ri';

export interface MenuItemProps {
  href: string;
  Icon: React.ReactNode;
  match: RegExp;
  title: string;
}

const items: MenuItemProps[] = [
  {
    href: '/type/update/id',
    Icon: <RiAccountCircleLine className='mr-2' size={20} />,
    match: /update/,
    title: 'Mon compte',
  },
  {
    href: '/type/addresses/id',
    Icon: <FaRegAddressCard className='mr-2' size={20} />,
    match: /addresses/,
    title: 'Mes adresses',
  },
];

export const customerItems: MenuItemProps[] = [
  {
    href: '/type/id',
    Icon: <BiBookHeart className='mr-2' size={20} />,
    match: /\/customers\/\[id\]$/,
    title: 'Mes lectures',
  },
  {
    href: '/type/recos/id',
    Icon: <CgUserList className='mr-2' size={20} />,
    match: /recos/,
    title: 'Mes recos',
  },
];

export default items;
