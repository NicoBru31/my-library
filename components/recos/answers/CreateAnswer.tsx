import { Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { updateReco } from '../../../fetch';
import useBooks from '../../../hooks/useBooks';
import { RecoBooksType } from '../../../types';
import { RecoSellerProps } from '../RecoSeller';
import CreateAnswerItem from './CreateAnswerItem';

const NB_RECOS = [Math.random().toString(), Math.random().toString()];

const CreateAnswer = ({ _id, sellerId, answers }: RecoSellerProps) => {
  const answer = answers?.find((answer) => answer.sellerId === sellerId);
  const methods = useForm<RecoBooksType>({
    defaultValues: answer || { books: [], sellerId },
  });
  const { control, handleSubmit, register, watch } = methods;
  const books = watch('books');
  const { fetchBooks } = useBooks();

  const send: SubmitHandler<RecoBooksType> = (data) => updateReco(data, _id);

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
        <Button colorScheme='teal' type='submit'>
          Envoyer
        </Button>
      </form>
    </FormProvider>
  );
};

export default CreateAnswer;