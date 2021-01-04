import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSession from '../../hooks/useSession';
import { scale } from '../../variants';

const HeaderProfile = () => {
  const { push } = useRouter();
  const session = useSession();
  const [src, setSrc] = React.useState(
    session?.isCustomer ? '/reader.svg' : '/seller.svg',
  );

  const goProfile = () => {
    if (!session.id) push({ pathname: '/login' });
    else if (session.isCustomer) push({ pathname: `/customers/${session.id}` });
    else if (!session.isCustomer) push({ pathname: `/sellers/${session.id}` });
  };

  React.useEffect(() => {
    if (session?.id)
      setSrc(session?.isCustomer ? '/reader.svg' : '/seller.svg');
  }, [session, setSrc]);

  if (!session?.id) return null;

  return (
    <motion.div
      className='flex items-center cursor-pointer hover:opacity-50'
      onClick={goProfile}
      whileHover={scale}
    >
      <Image alt='avatar' src={src} height={40} width={40} />
      <div className='text-white pl-4 hidden md:block'>{`${
        session?.fullName || ''
      }`}</div>
    </motion.div>
  );
};

export default HeaderProfile;
