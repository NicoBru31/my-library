import Image from 'next/image';
import { useRouter } from 'next/router';
import { CardInterface } from './cards';

const Card = ({ alt, img, link, text, title }: CardInterface) => {
  const { push } = useRouter();

  const goTo = () => push({ pathname: link });

  return (
    <div
      className='w-1/3 bg-cardbg text-center p-4 cursor-pointer hover:bg-cardbghover'
      onClick={goTo}
    >
      <Image alt={alt} src={img} height={200} width={200} />
      <div className='text-white text-3xl'>{title}</div>
      <div className='text-white'>{text}</div>
    </div>
  );
};

export default Card;
