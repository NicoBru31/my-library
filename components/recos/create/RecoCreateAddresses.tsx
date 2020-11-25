import { Checkbox, TabPanel } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import { CustomerType } from '../../../types';

const RecoCreateAddresses = () => {
  const { data } = useQuery<CustomerType>('customer');
  const { control } = useFormContext();

  return (
    <>
      <div>Sélectionnez une ou plusieurs adresses</div>
      {data?.addresses.map((address) => (
        <Controller
          control={control}
          key={address.name}
          name='from'
          render={({ onChange, value }) => (
            <>
              {data?.addresses?.map((address) => (
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
      ))}
    </>
  );
};

export default RecoCreateAddresses;
