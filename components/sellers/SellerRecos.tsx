import { Accordion } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { RecoType } from '../../types';
import RecoSeller from '../recos/RecoSeller';

interface Props {
  id: string;
}

const SellerRecos = ({ id }: Props) => {
  const { data: recos } = useQuery<RecoType[]>('recos');

  return (
    <div>
      Les recos en attente :
      <Accordion>
        {recos
          ?.sort((a, b) =>
            dayjs(b.createdAt).isAfter(dayjs(a.createdAt)) ? -1 : 1,
          )
          ?.map((reco) => (
            <RecoSeller {...reco} key={reco._id} sellerId={id} />
          ))}
      </Accordion>
    </div>
  );
};

export default SellerRecos;
