import { Button } from '@chakra-ui/react';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { createAddress } from '@/fetch/index';
import useSession from '@/hooks/useSession';
import useUpdate from '@/hooks/useUpdate';
import {
  AddressType,
  CreateAddressType,
  CustomerType,
  ModalProps,
} from '@/types/index';
import ModalFacc from '../facc/ModalFacc';
import Input from '../form/Input';
import fields from './addressFields';

const CreateAddress = (props: ModalProps) => {
  const session = useSession();
  const { errors, handleSubmit, register, reset } = useForm<AddressType>({
    mode: 'onBlur',
    shouldFocusError: true,
  });
  const { mutateAsync, isLoading } = useUpdate<
    AddressType,
    CustomerType,
    CreateAddressType
  >({
    action: createAddress,
    key: !session?.isCustomer ? 'seller' : 'customer',
    reset,
    subKey: 'addresses',
  });

  const save: SubmitHandler<AddressType> = (variables) =>
    mutateAsync({
      address: variables,
      fromSeller: !session?.isCustomer,
      id: session?.id,
    }).then(props.onClose);

  return (
    <ModalFacc {...props} title='Créer une adresse'>
      <form onSubmit={handleSubmit(save)}>
        {fields.map((field) => (
          <Input
            {...field}
            classLabel='text-black'
            error={errors[field.name] as FieldError}
            key={field.name}
            register={register}
          />
        ))}
        <div className='flex justify-end'>
          <Button
            aria-label='Fermer'
            className='mr-2'
            colorScheme='teal'
            onClick={props.onClose}
            variant='outline'
          >
            Fermer
          </Button>
          <Button
            aria-label='Ajouter'
            disabled={isLoading}
            colorScheme='teal'
            type='submit'
          >
            Ajouter
          </Button>
        </div>
      </form>
    </ModalFacc>
  );
};

export default CreateAddress;
