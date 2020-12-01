import { Checkbox } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import { CustomerType } from '../../../types';

const RecoCreateAddresses = () => {
  const { data } = useQuery<CustomerType>('customer');
  const { control } = useFormContext();

  return (
    <>
      <div>Sélectionnez une ou plusieurs adresses</div>
      <Controller
        control={control}
        name='from.addresses'
        render={({ onChange, value }) => (
          <>
            {data?.addresses?.map((address) => (
              <Checkbox
                colorScheme='teal'
                defaultIsChecked={value?.includes(address._id)}
                key={address._id}
                onChange={(e) => {
                  const { checked } = e.target;
                  if (!checked) {
                    onChange(value.filter((id) => id !== address._id));
                  } else {
                    onChange([address._id, ...value]);
                  }
                }}
              >
                {`${address.name} - ${address.zip} ${address.city}`}
              </Checkbox>
            ))}
          </>
        )}
      />
    </>
  );
};

export default RecoCreateAddresses;
