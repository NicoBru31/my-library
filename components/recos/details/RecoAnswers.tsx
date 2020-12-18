import * as React from 'react';
import { RecoType } from '../../../types';
import RecoAnswer from './RecoAnswer';
import RecoAnswerMessage from './RecoAnswerMessage';

const RecoAnswers = ({ answers = [] }: RecoType) => (
  <div className='p-4 text-white'>
    {answers.map((answer) => (
      <div className='flex justify-between' key={answer.sellerId}>
        <RecoAnswer {...answer} />
        {answer.message && <RecoAnswerMessage message={answer.message} />}
      </div>
    ))}
  </div>
);

export default RecoAnswers;
