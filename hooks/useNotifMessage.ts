import { useState, useEffect } from 'react';
import { RecoBooksType } from '../types';
import useSession from './useSession';

const useNotifResponses = (answers: RecoBooksType[]) => {
  const session = useSession();
  const [notif, setNotif] = useState('');

  useEffect(() => {
    if (!session || !answers) return;
    if (session.isCustomer) {
      const response = answers.reduce((f, e) => f + e.books.length, 0);
      setNotif(
        `${response} réponse${response > 1 ? 's' : ''} reçue${
          response > 1 ? 's' : ''
        }`,
      );
    } else {
      const response = answers
        ?.filter(({ sellerId }) => sellerId === session?.id)
        ?.reduce((f, answer) => f - answer.books.length, 2);
      setNotif(
        `Il vous reste ${response} réponse${response > 1 ? 's' : ''} à envoyer`,
      );
    }
  }, [answers, session, setNotif]);

  return notif;
};

export default useNotifResponses;
