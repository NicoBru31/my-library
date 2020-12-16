import { Button } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useQueryClient } from 'react-query';
import AlertContext from '../../../contexts/AlertContext';
import { updateReco } from '../../../fetch';
import useBooks from '../../../hooks/useBooks';
import { RecoBooksType, RecoType } from '../../../types';
import Input from '../../form/Input';
import { RecoSellerProps } from '../RecoSeller';
import CreateAnswerItem from './CreateAnswerItem';

const NB_RECOS = [Math.random().toString(), Math.random().toString()];

const CreateAnswer = ({ _id, sellerId, answers }: RecoSellerProps) => {
  const queryClient = useQueryClient();
  const answer = answers?.find((answer) => answer.sellerId === sellerId);
  const methods = useForm<RecoBooksType>({
    defaultValues: answer || { books: [], message: '', sellerId },
    mode: 'onBlur',
    shouldFocusError: true,
  });
  const { setAlert } = useContext(AlertContext);
  const { control, handleSubmit, register, watch } = methods;
  const books = watch('books');
  const { fetchBooks } = useBooks();

  const send: SubmitHandler<RecoBooksType> = (data) =>
    updateReco(data, _id).then((reco) => {
      setAlert({
        message: 'Votre reco a été envoyée au client',
        status: 'success',
      });
      queryClient.setQueryData<RecoType[]>('recos', (recos) =>
        [...recos].map((r) => (r._id === reco._id ? reco : r)),
      );
    });

  useEffect(() => {
    if (books?.length) fetchBooks(...books);
  }, [books]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(send)}>
        <input className='hidden' name='sellerId' ref={register()} />
        <Controller
          control={control}
          name='books'
          render={({ value: values }) => (
            <>
              {NB_RECOS.map((r, index) => (
                <CreateAnswerItem index={index} key={r} value={values[index]} />
              ))}
            </>
          )}
        />
        <div>Voulez-vous ajouter un message au client ?</div>
        <Input name='message' register={methods.register} textarea />
        <Button colorScheme='teal' type='submit'>
          Envoyer
        </Button>
      </form>
    </FormProvider>
  );
};

export default CreateAnswer;
