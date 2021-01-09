import dayjs from 'dayjs';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { RecoType } from '@/types/index';
import Input from '../../form/Input';

const RecoCreateName = () => {
  const { register } = useFormContext<RecoType>();
  return (
    <div>
      <div>Je donne un nom à cette reco pour mieux la retrouver :</div>
      <Input
        defaultValue={dayjs().format('DD-MM-YYYY')}
        name='name'
        register={register}
      />
    </div>
  );
};

export default RecoCreateName;
