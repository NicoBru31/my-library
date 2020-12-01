import { Button, useDisclosure } from '@chakra-ui/react';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import useSession from '../../hooks/useSession';
import useUpdate from '../../hooks/useUpdate';
import { Field } from '../../types';
import ModalFacc from '../facc/ModalFacc';
import Input from '../form/Input';

interface Props<T> {
  fields: Field<T>[];
  initial: T;
  subKey: string;
  title: string;
  update: (data: unknown) => Promise<T>;
}

const UpdateModal = <T extends { _id: string }>({
  initial,
  fields,
  subKey,
  title,
  update,
}: Props<T>) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const session = useSession();
  const { errors, handleSubmit, register, reset } = useForm<T>({
    mode: 'onBlur',
    shouldFocusError: true,
  });
  const { mutate, isLoading } = useUpdate({
    action: update,
    isUpdate: true,
    key: !session?.isCustomer ? 'seller' : 'customer',
    reset,
    subKey,
  });

  const save: SubmitHandler<T> = (variables) => mutate(variables).then(onClose);

  return (
    <>
      <Button colorScheme='teal' onClick={onOpen}>
        Modifier
      </Button>
      <ModalFacc isOpen={isOpen} onClose={onClose} title={title}>
        <form onSubmit={handleSubmit(save)}>
          {fields.map((field) => (
            <Input
              {...field}
              defaultValue={initial[field.name.toString()]}
              error={errors[field.name] as FieldError}
              key={field.name.toString()}
              register={register}
            />
          ))}
          <input
            className='hidden'
            defaultValue={initial._id}
            name='_id'
            ref={register}
          />
          <div className='flex justify-end'>
            <Button
              className='mr-2'
              colorScheme='teal'
              onClick={onClose}
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

export default UpdateModal;
