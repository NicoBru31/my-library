import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { InputType } from '../../types';

const Input = <T extends {}>({
  error,
  name,
  register,
  rules,
  textarea,
  ...props
}: InputType<T>) => (
  <>
    <div>
      {textarea ? (
        <textarea
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className='Input'
          name={name}
          ref={register(rules)}
        />
      ) : (
        <input
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
          className='Input'
          name={name}
          ref={register(rules)}
        />
      )}
    </div>
    <div style={{ color: 'red' }}>{error?.message}</div>
  </>
);

export default Input;
