import { Accordion } from '@chakra-ui/react';
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
        {recos?.map((reco) => (
          <RecoSeller {...reco} key={reco._id} sellerId={id} />
        ))}
      </Accordion>
    </div>
  );
};

export default SellerRecos;
