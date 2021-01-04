import * as React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import RecoContext from '../../../contexts/RecoContext';
import useSession from '../../../hooks/useSession';
import Book from '../../utils/Book';

interface Props {
  bookId: string;
}

const DeleteAnswer = ({ bookId }: Props) => {
  const { reco, setReco } = React.useContext(RecoContext);
  const session = useSession();

  const remove = () =>
    setReco({
      ...reco,
      answers: reco.answers.map((answer) =>
        answer.sellerId !== session?.id
          ? answer
          : {
              ...answer,
              books: answer.books.filter((book) => book !== bookId),
            },
      ),
    });

  return (
    <div className='flex justify-start'>
      <Book bookId={bookId} key={bookId} />
      <AiFillDelete
        className='cursor-pointer ml-2 hover:opacity-50'
        color='white'
        onClick={remove}
        size={20}
      />
    </div>
  );
};

export default DeleteAnswer;
