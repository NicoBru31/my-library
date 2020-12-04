import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CardInterface } from './cards';

const Card = ({ alt, img, search, text, title }: CardInterface) => (
  <Link href={{ pathname: '/login', search }} data-testid='link-element'>
    <div className='md:w-1/3 bg-cardbg text-center m-4 p-4 cursor-pointer hover:bg-cardbghover'>
      <Image alt={alt} src={img} height={200} width={200} />
      <div className='text-white text-3xl'>{title}</div>
      <div className='text-white'>{text}</div>
    </div>
  </Link>
);

export default Card;
