import { Checkbox } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import useBooks from '../../../hooks/useBooks';
import { CustomerType, RecoType } from '../../../types';

const RecoCreateReadings = () => {
  const { control } = useFormContext<RecoType>();
  const { data: customer } = useQuery<CustomerType>('customer');
  const { data, fetchBooks } = useBooks();

  useEffect(() => {
    if (customer.readings.length) {
      fetchBooks(...customer.readings.map(({ bookId }) => bookId));
    }
  }, [customer]);

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
                {`${data.find(({ _id }) => _id === reading.bookId)?.title} - ${
                  reading.rating
                }/20`}
              </Checkbox>
            ))}
          </>
        )}
      />
    </>
  );
};

export default RecoCreateReadings;
