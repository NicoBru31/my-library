import { InputProps, TextareaProps } from '@chakra-ui/react';
import { FieldError, UseFormMethods, ValidationRules } from 'react-hook-form';
import { BookType, RecoBooksType } from './books';

export * from './books';
export * from './calls';
export * from './modals';

export interface AddressType {
  _id: string;
  address: string;
  askForReco: boolean;
  city: string;
  name: string;
  seller?: SellerType;
  zip: string;
}

export interface CustomerType {
  _id: string;
  addresses?: AddressType[];
  confirm: string;
  email: string;
  firstName: string;
  hash: string;
  lastName: string;
  password: string;
  readings: ReadingType[];
  recos: RecoType[];
}

export interface CustomerPageType {
  customer: CustomerType;
  id: string;
}

export type Field<T> = (
  | Omit<InputProps, 'name'>
  | Omit<TextareaProps, 'name'>
) & {
  label?: string;
  name: keyof T;
  rules?: ValidationRules;
  textarea?: boolean;
};

export type InputType<T> = Field<T> & {
  classLabel?: string;
  error?: FieldError;
  label?: string;
  register: UseFormMethods<T>['register'];
};

export interface ReadingType {
  _id: string;
  book: BookType;
  bookId: string;
  comments: string;
  customerId: string;
  rating: number;
}

export interface RecoType {
  _id: string;
  answers: RecoBooksType[];
  createdAt: Date;
  customerId: string;
  from: {
    addresses: string[];
    readings: string[];
    type?: 'city' | 'department' | 'zip';
  };
  isClosed: boolean;
  notified?: string[];
}

export interface SellerType {
  _id: string;
  addresses: AddressType[];
  confirm: string;
  hash: string;
  email: string;
  name: string;
  password: string;
}

export interface SellerPageType {
  recos: RecoType[];
  seller: SellerType;
  id: string;
}
