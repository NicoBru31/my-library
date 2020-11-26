import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSession from '../../hooks/useSession';

const HeaderProfile = () => {
  const { push } = useRouter();
  const session = useSession();
  const [src, setSrc] = useState(
    session?.isCustomer ? '/reader.svg' : '/seller.svg',
  );

  const goProfile = () => {
    if (!session.id) push({ pathname: '/login' });
    else if (session.isCustomer) push({ pathname: `/customers/${session.id}` });
    else if (!session.isCustomer) push({ pathname: `/sellers/${session.id}` });
  };

  useEffect(() => {
    if (session?.id)
      setSrc(session?.isCustomer ? '/reader.svg' : '/seller.svg');
  }, [session, setSrc]);

  if (!session?.id) return null;

  return (
    <div
      className='flex items-center cursor-pointer hover:opacity-50'
      onClick={goProfile}
    >
      <Image alt='avatar' src={src} height={40} width={40} />
      <div className='text-white pl-4'>{`${session?.fullName || ''}`}</div>
    </div>
  );
};

export default HeaderProfile;
