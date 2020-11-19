import { Checkbox } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import { CustomerType, RecoType } from '../../types';

const RecoReadings = () => {
  const { control } = useFormContext<RecoType>();
  const { data: customer } = useQuery<CustomerType>('customer');

  return (
    <div className='w-1/4'>
      <div className='my-4'>Mes lectures :</div>
      <Controller
        control={control}
        name='from'
        render={({ onChange, value }) => (
          <>
            {customer?.readings?.map((reading) => (
              <Checkbox
                defaultIsChecked={value.readings.includes(reading._id)}
                key={reading._id}
                onChange={() => {
                  if (value.readings.includes(reading._id)) {
                    onChange({
                      ...value,
                      readings: value.readings.filter(
                        ({ _id }) => _id !== reading._id,
                      ),
                    });
                  } else {
                    onChange({
                      ...value,
                      readings: [...value.readings, reading._id],
                    });
                  }
                }}
              >
                {`${reading.name} - ${reading.rating}/20`}
              </Checkbox>
            ))}
          </>
        )}
      />
    </div>
  );
};

export default RecoReadings;
