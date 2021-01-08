import { Badge, Stack } from '@chakra-ui/react';
import * as React from 'react';
import { useQuery } from 'react-query';
import RecoContext from '../../contexts/RecoContext';
import useSession from '../../hooks/useSession';
import { filterRecoByDone, filterRecoByWaiting } from '../../tools';
import { RecoType } from '../../types';

interface Props {
  setRecos: React.Dispatch<React.SetStateAction<RecoType[]>>;
}

const SellerFilter = ({ setRecos }: Props) => {
  const { data } = useQuery<RecoType[]>('recos');
  const session = useSession();
  const { setReco } = React.useContext(RecoContext);
  const [selected, setSelected] = React.useState<'WAITING' | 'DONE'>('WAITING');

  React.useEffect(() => {
    setRecos(() => {
      if (selected === 'DONE') return filterRecoByDone(data, session.id);
      return filterRecoByWaiting(data, session?.id);
    });
  }, [selected, setRecos, session, data]);

  React.useEffect(() => {
    setReco(undefined);
  }, [selected, setReco]);

  return (
    <Stack direction='row'>
      <Badge
        className='cursor-pointer hover:opacity-50'
        onClick={() => setSelected('WAITING')}
        variant={selected === 'WAITING' ? 'solid' : 'outline'}
        colorScheme='teal'
      >
        En attente de réponse
      </Badge>
      <Badge
        className='cursor-pointer hover:opacity-50'
        onClick={() => setSelected('DONE')}
        variant={selected === 'DONE' ? 'solid' : 'outline'}
        colorScheme='teal'
      >
        Recos complétées
      </Badge>
    </Stack>
  );
};

export default SellerFilter;
