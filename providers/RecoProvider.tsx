import * as React from 'react';
import RecoContext from '@/contexts/RecoContext';
import useSession from '@/hooks/useSession';
import { RecoBooksType, RecoType } from '../types';

const RecoProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [reco, setReco] = React.useState<RecoType>();
  const [answer, setAnswer] = React.useState<RecoBooksType>();
  const session = useSession();

  const changeReco = (newReco?: RecoType) => {
    if (newReco) {
      setReco(undefined);
      setTimeout(() => setReco(newReco), 500);
    } else setReco(undefined);
  };

  React.useEffect(() => {
    if (session?.id && reco)
      setAnswer(reco.answers.find((a) => a.sellerId === session.id));
  }, [session, setAnswer, reco]);

  React.useEffect(() => {
    if (answer)
      setReco((r) => ({
        ...r,
        answers: r.answers.map((a) =>
          a.sellerId === answer.sellerId ? answer : a,
        ),
      }));
  }, [answer, setReco]);

  return (
    <RecoContext.Provider
      value={{ answer, reco, setReco, setAnswer, changeReco }}
    >
      {children}
    </RecoContext.Provider>
  );
};

export default RecoProvider;
