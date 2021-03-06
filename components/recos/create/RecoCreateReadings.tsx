import { Checkbox } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import useBooks from '@/hooks/useBooks';
import { CustomerType, RecoType } from '@/types/index';
import AddReading from '../../readings/AddReading';

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
      <div>Je choisis des lectures.</div>
      Cliquez <AddReading>ici</AddReading> pour en ajouter une.
      <Controller
        control={control}
        name='from.readings'
        render={({ onChange, value }) => (
          <>
            {customer?.readings?.map((reading) => (
              <Checkbox
                colorScheme='teal'
                defaultIsChecked={value?.includes(reading._id)}
                key={reading._id}
                onChange={(e) => {
                  const { checked } = e.target;
                  if (!checked) {
                    onChange(value.filter((id) => id !== reading._id));
                  } else {
                    onChange([...value, reading._id]);
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
