import {
  Input as ChakraInput,
  InputProps,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react';
import * as React from 'react';
import { InputType } from '@/types/index';

const Input = <T extends {}>({
  classLabel,
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
      {label && (
        <label className={classLabel || 'text-white'} htmlFor={name.toString()}>
          {label}
          <br />
        </label>
      )}
      {textarea ? (
        <Textarea
          {...(props as TextareaProps)}
          className='Input'
          id={name.toString()}
          name={name.toString()}
          ref={register(rules)}
          role='textbox'
          style={{ width: '300px' }}
        />
      ) : (
        <ChakraInput
          {...(props as InputProps)}
          className='Input'
          id={name.toString()}
          name={name.toString()}
          ref={register(rules)}
          role='textbox'
          style={{ width: '300px' }}
        />
      )}
    </div>
    {error?.message && (
      <div role='alert' style={{ color: 'red' }}>
        {error.message}
      </div>
    )}
  </>
);

export default Input;
