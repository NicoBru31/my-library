import * as React from 'react';
import useSession from '../../../hooks/useSession';
import { RecoType } from '../../../types';
import RecoAnswer from './RecoAnswer';
import RecoAnswerMessage from './RecoAnswerMessage';
import RecoAnswerSeller from './RecoAnswerSeller';

const RecoAnswers = ({ answers = [] }: RecoType) => {
  const session = useSession();

  return (
    <div className='p-4 text-white'>
      {answers.map((answer) => (
        <div className='flex justify-between' key={answer.sellerId}>
          {session?.isCustomer ? (
            <RecoAnswer {...answer} />
          ) : (
            <RecoAnswerSeller {...answer} />
          )}
          {answer.message && session.isCustomer && (
            <RecoAnswerMessage message={answer.message} />
          )}
        </div>
      ))}
    </div>
  );
};

export default RecoAnswers;
