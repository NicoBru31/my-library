import { IncomingMessage, ServerResponse } from 'http';
import { Db } from 'mongodb';
import { InputProps, TextareaProps } from '@chakra-ui/react';
import { FieldError, UseFormMethods, ValidationRules } from 'react-hook-form';

export interface AddressType {
  _id: string;
  address: string;
  askForReco: boolean;
  city: string;
  name: string;
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

export type Field<T> = (InputProps | TextareaProps) & {
  name: keyof T;
  rules?: ValidationRules;
  textarea?: boolean;
};

export type InputType<T> = Field<T> & {
  error?: FieldError;
  register: UseFormMethods<T>['register'];
};

export interface Incoming extends IncomingMessage {
  body?: any;
  db: Db;
  query: { id?: string; fromSeller?: string };
}

export interface ReadingType {
  _id: string;
  author: string;
  comments: string;
  name: string;
  rating: number;
}

export interface RecoType {
  _id: string;
  createdAt: Date;
  customerId: string;
  from: {
    addresses: string[];
    readings: string[];
  };
  isClosed: boolean;
}

export interface Response extends ServerResponse {
  json: (data: Record<string, any>) => void;
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
  seller: SellerType;
  id: string;
}
