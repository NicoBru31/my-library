import * as React from 'react';
import useSession from '@/hooks/useSession';
import { RecoType } from '@/types/index';
import RecoAnswer from '../answers/RecoAnswer';
import RecoAnswerMessage from './RecoAnswerMessage';
import RecoAnswerSeller from './RecoAnswerSeller';
import RecoFrom from '../details/RecoFrom';

const RecoAnswers = ({ answers = [] }: RecoType) => {
  const session = useSession();

  return (
    <div className='p-4 text-white'>
      <RecoFrom />
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
