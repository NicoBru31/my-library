import { useContext } from 'react';
import AlertContext from '../contexts/AlertContext';
import RecoContext from '../contexts/RecoContext';
import { updateReco } from '../fetch';
import useSession from './useSession';

const useAnswer = () => {
  const session = useSession();
  const { reco, setReco } = useContext(RecoContext);
  const { setAlert } = useContext(AlertContext);

  const updateLocalAnswer = (bookId: string) =>
    setReco((reco) => ({
      ...reco,
      answers: reco.answers.map((answer) =>
        answer.sellerId !== session.id
          ? answer
          : { ...answer, books: [bookId, ...answer.books] },
      ),
    }));

  const update = () =>
    updateReco(
      reco.answers.find(({ sellerId }) => sellerId === session.id),
      reco._id,
    )
      .then(() =>
        setAlert({
          message: 'Votre réponse a été enregistrée',
          status: 'success',
        }),
      )
      .catch(() =>
        setAlert({
          message: "Erreur lors de l'enregistrement de votre réponse",
          status: 'error',
        }),
      );

  return { update, updateLocalAnswer };
};

export default useAnswer;
