import { Textarea } from '@chakra-ui/react';
import * as React from 'react';
import RecoContext from '../../../contexts/RecoContext';
import useSession from '../../../hooks/useSession';

const RecoSellerMessage = () => {
  const session = useSession();
  const { reco, setReco } = React.useContext(RecoContext);

  const change = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReco((data) => ({
      ...data,
      answers: data.answers.map((answer) =>
        session.id !== answer.sellerId
          ? answer
          : { ...answer, message: event.target.value },
      ),
    }));
  };

  return (
    <div className='my-2'>
      <div className='text-white'>Je laisse un message au client :</div>
      <Textarea
        background='white'
        defaultValue={
          reco.answers.find(({ sellerId }) => sellerId === session.id)?.message
        }
        onChange={change}
        role='textbox'
        style={{ width: '300px' }}
        textColor='black'
      />
    </div>
  );
};

export default RecoSellerMessage;
