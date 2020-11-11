import { ReadingType } from '../../types';

const Reading = ({ author, comments, name, rating }: ReadingType) => (
  <li>
    <div>
      <i>{name}</i>
      {` par ${author}`}
    </div>
    <div>{`Note : ${rating} / 20`}</div>
    <div>{`Commentaires : ${comments}`}</div>
  </li>
);

export default Reading;
