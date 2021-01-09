import { useContext } from 'react';
import AlertContext from '@/contexts/AlertContext';
import RecoContext from '@/contexts/RecoContext';
import { updateReco } from '../fetch';

const useAnswer = () => {
  const { answer, reco, setAnswer } = useContext(RecoContext);
  const { setAlert } = useContext(AlertContext);

  const updateLocalAnswer = (bookId: string) =>
    setAnswer((a) => ({
      ...a,
      books: [bookId, ...a.books],
    }));

  const update = () =>
    updateReco(answer, reco._id)
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
