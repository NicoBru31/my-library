import { ReadingType } from '../../types';

const Reading = ({ author, comments, name, rating }: ReadingType) => (
  <div className='bg-cardbg text-center text-white h-56 w-1/4 m-8 p-4'>
    <div className='text-xl'>
      <div className='italic'>{name}</div>
      {` par ${author}`}
    </div>
    <div>{`Note : ${rating} / 20`}</div>
    <div className='flex-wrap'>{`Commentaires : ${comments}`}</div>
  </div>
);

export default Reading;
