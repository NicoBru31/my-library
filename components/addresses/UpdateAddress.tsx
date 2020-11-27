import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { updateAddress } from '../../fetch';
import useSession from '../../hooks/useSession';
import useUpdate from '../../hooks/useUpdate';
import { AddressType, CustomerType } from '../../types';
import ModalFacc from '../facc/ModalFacc';
import Input from '../form/Input';
import fields from './addressFields';

const UpdateAddress = (address: AddressType) => {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const { errors, handleSubmit, register, reset } = useForm<AddressType>({
    defaultValues: address,
    mode: 'onBlur',
    shouldFocusError: true,
  });
  const { mutate, isLoading } = useUpdate<
    AddressType,
    CustomerType,
    Partial<AddressType>
  >({
    action: updateAddress,
    isUpdate: true,
    key: !session?.isCustomer ? 'seller' : 'customer',
    reset,
    subKey: 'addresses',
  });

  const save: SubmitHandler<AddressType> = (variables) =>
    mutate(variables).then(() => setOpen(false));

  return (
    <>
      <Button
        colorScheme='teal'
        onClick={() => setOpen(true)}
        variant='outline'
      >
        Modifier
      </Button>
      <ModalFacc open={open} setOpen={setOpen} title='Modifier une adresse'>
        <form onSubmit={handleSubmit(save)}>
          {fields.map((field) => (
            <Input
              {...field}
              error={errors[field.name] as FieldError}
              key={field.name}
              register={register}
            />
          ))}
          <input className='hidden' name='_id' ref={register} />
          <div className='flex justify-end'>
            <Button
              className='mr-2'
              colorScheme='teal'
              onClick={() => setOpen(false)}
              variant='outline'
            >
              Fermer
            </Button>
            <Button disabled={isLoading} colorScheme='teal' type='submit'>
              Valider
            </Button>
          </div>
        </form>
      </ModalFacc>
    </>
  );
};

export default UpdateAddress;
