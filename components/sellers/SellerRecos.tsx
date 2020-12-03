import { Accordion, ExpandedIndex } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { queryCache, useQuery } from 'react-query';
import { patchReco } from '../../fetch';
import { RecoType } from '../../types';
import RecoSeller from '../recos/RecoSeller';

interface Props {
  id: string;
}

const SellerRecos = ({ id }: Props) => {
  const { data: recos } = useQuery<RecoType[]>('recos');

  const sendIsNotified = (index: ExpandedIndex) => {
    if (typeof index === 'number') {
      index >= 0 &&
        patchReco(id, recos[index]._id).then(({ notified }) =>
          queryCache.setQueryData<RecoType[]>('recos', () =>
            recos.map((reco, i) =>
              index === i ? { ...reco, notified } : reco,
            ),
          ),
        );
    } else index.forEach(sendIsNotified);
  };

  return (
    <div>
      Les recos en attente :
      <Accordion allowToggle colorScheme='teal'>
        {recos
          ?.sort((a, b) =>
            dayjs(b.createdAt).isAfter(dayjs(a.createdAt)) ? 1 : -1,
          )
          ?.map((reco) => (
            <RecoSeller {...reco} key={reco._id} sellerId={id} />
          ))}
      </Accordion>
    </div>
  );
};

export default SellerRecos;
