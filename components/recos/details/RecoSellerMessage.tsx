import { Textarea } from '@chakra-ui/react';
import * as React from 'react';
import RecoContext from '@/contexts/RecoContext';

const RecoSellerMessage = () => {
  const { answer, setAnswer } = React.useContext(RecoContext);

  const change = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setAnswer((a) => ({ ...a, message: event.target.value }));

  return (
    <div className='my-2'>
      <div className='text-white'>Je laisse un message au client :</div>
      <Textarea
        background='white'
        defaultValue={answer?.message}
        onChange={change}
        role='textbox'
        style={{ width: '300px' }}
        textColor='black'
      />
    </div>
  );
};

export default RecoSellerMessage;
