import {
  Input as ChakraInput,
  InputProps,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react';
import { InputType } from '../../types';

const Input = <T extends {}>({
  error,
  label,
  name,
  register,
  rules,
  textarea,
  ...props
}: InputType<T>) => (
  <>
    <div className='mb-2'>
      {label && <div className='text-white'>{label}</div>}
      {textarea ? (
        <Textarea
          {...(props as TextareaProps)}
          className='Input'
          style={{ width: '300px' }}
          name={name.toString()}
          ref={register(rules)}
        />
      ) : (
        <ChakraInput
          {...(props as InputProps)}
          className='Input'
          style={{ width: '300px' }}
          name={name.toString()}
          ref={register(rules)}
        />
      )}
    </div>
    <div style={{ color: 'red' }}>{error?.message}</div>
  </>
);

export default Input;
