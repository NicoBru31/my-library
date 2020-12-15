import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import useSession from '../../hooks/useSession';
import { menuItemVariants } from '../../variants';
import items, { customerItems } from './items';
import MenuItem from './MenuItem';

interface Props {
  type: 'customers' | 'sellers';
}

const MenuItems = ({ type }: Props) => {
  const session = useSession();
  const { route } = useRouter();

  if (!session.id) return null;

  return (
    <motion.div className='pl-6 mb-6' variants={menuItemVariants}>
      {items.map(({ href, match, ...item }) => (
        <MenuItem
          {...item}
          href={href.replace(/type/, type).replace(/id/, session.id)}
          isActive={route.match(match)?.length > 0}
          key={href}
        />
      ))}
      {type === 'customers' && (
        <>
          {customerItems.map(({ href, match, ...item }) => (
            <MenuItem
              {...item}
              href={href.replace(/type/, type).replace(/id/, session.id)}
              isActive={route.match(match)?.length > 0}
              key={href}
            />
          ))}
        </>
      )}
    </motion.div>
  );
};

export default MenuItems;
