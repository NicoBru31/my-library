import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

const RecoCreateType = () => {
  const { control } = useFormContext();

  return (
    <>
      <div>Je veux contacter les libraires</div>
      <Controller
        control={control}
        defaultValue='city'
        name='from.type'
        render={({ onChange, value }) => (
          <RadioGroup onChange={onChange} value={value}>
            <Stack direction='row'>
              <Radio value='city'>de ma ville</Radio>
              <Radio value='department'>de mon départment</Radio>
              <Radio value='zip'>de mon quartier (même code postal)</Radio>
            </Stack>
          </RadioGroup>
        )}
      />
    </>
  );
};

export default RecoCreateType;
