import * as React from 'react';

interface Props {
  title: string;
  text: string;
}

const Intro = ({ text, title }: Props) => {
  return (
    <div className='bg-cardbg text-center p-4 mb-10 text-white'>
      <div className='font-bold text-2xl'>{title}</div>
      <div>{text}</div>
    </div>
  );
};

export default Intro;
