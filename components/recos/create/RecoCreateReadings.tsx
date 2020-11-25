import { Checkbox } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import { CustomerType, RecoType } from '../../../types';

const RecoCreateReadings = () => {
  const { control } = useFormContext<RecoType>();
  const { data: customer } = useQuery<CustomerType>('customer');

  return (
    <>
      <div className='my-4'>Je choisis des lectures</div>
      <Controller
        control={control}
        name='from'
        render={({ onChange, value }) => (
          <>
            {customer?.readings?.map((reading) => (
              <Checkbox
                defaultIsChecked={value.readings?.includes(reading._id)}
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
                {`${reading.bookId} - ${reading.rating}/20`}
              </Checkbox>
            ))}
          </>
        )}
      />
    </>
  );
};

export default RecoCreateReadings;
