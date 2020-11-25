import Image from 'next/image';
import { useRouter } from 'next/router';
import { CgProfile } from 'react-icons/cg';
import useSession from '../../hooks/useSession';

const HeaderProfile = () => {
  const { push } = useRouter();
  const session = useSession();

  const goProfile = () => {
    if (!session.id) push({ pathname: '/login' });
    else if (session.isCustomer) push({ pathname: `/customers/${session.id}` });
    else if (!session.isCustomer) push({ pathname: `/sellers/${session.id}` });
  };

  return (
    <div
      className='flex items-center cursor-pointer hover:opacity-50'
      onClick={goProfile}
    >
      <Image
        alt='avatar'
        src={session?.isCustomer ? '/reader.svg' : '/seller.svg'}
        height={40}
        width={40}
      />
      <div className='text-white pl-4'>{`${session?.fullName || ''}`}</div>
    </div>
  );
};

export default HeaderProfile;
