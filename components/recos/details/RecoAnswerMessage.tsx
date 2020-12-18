import * as React from 'react';
import PopoverText from '../../utils/PopoverText';

interface Props {
  message: string;
}

const RecoAnswerMessage = ({ message }: Props) => (
  <div className='hidden w-0 md:block md:w-1/3'>
    <div>Le message du libraire :</div>
    <div className='h-auto bg-white p-2 text-black rounded'>
      {message.length < 50 ? (
        message
      ) : (
        <span>
          {`${message.substr(0, 50)}...`}
          <PopoverText
            headerText='Message complet'
            full={message}
            trigger=' voir tout'
          />
        </span>
      )}
    </div>
  </div>
);

export default RecoAnswerMessage;
