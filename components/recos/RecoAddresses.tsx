import { Checkbox } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import { CustomerType, RecoType } from '../../types';

const RecoAddresses = () => {
  const { control } = useFormContext<RecoType>();
  const { data: customer } = useQuery<CustomerType>('customer');

  return (
    <div className='w-1/4'>
      <div className='my-4'>Mes adresses :</div>
      <Controller
        control={control}
        name='from'
        render={({ onChange, value }) => (
          <>
            {customer?.addresses?.map((address) => (
              <Checkbox
                defaultIsChecked={value?.addresses.includes(address._id)}
                key={address._id}
                onChange={() => {
                  if (value?.addresses.includes(address._id)) {
                    onChange({
                      ...value,
                      addresses: value.addresses.filter(
                        (id) => id !== address._id,
                      ),
                    });
                  } else {
                    onChange({
                      ...value,
                      addresses: [...value.addresses, address._id],
                    });
                  }
                }}
              >
                {`${address.name} - ${address.zip} ${address.city}`}
              </Checkbox>
            ))}
          </>
        )}
      />
    </div>
  );
};

export default RecoAddresses;
