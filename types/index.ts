import { IncomingMessage, ServerResponse } from 'http';
import { Db } from 'mongodb';
import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { FieldError, UseFormMethods, ValidationRules } from 'react-hook-form';

export interface AddressType {
  _id: string;
  address: string;
  city: string;
  name: string;
  zip: string;
}

export interface AddressPageType {
  addresses: AddressType[];
  customer: CustomerType;
  id: string;
}

export interface ReadingType {
  author: string;
  comments: string;
  _id: string;
  name: string;
  rating: number;
}

export interface Credentials {
  email: string;
  id: string;
  password: string;
  type: 'customer' | 'seller';
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
}

export interface CustomerPageType {
  customer: CustomerType;
  id: string;
}

export type Field<T> = (
  | InputHTMLAttributes<HTMLInputElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>
) & {
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
  query: { id?: string };
}

export interface Response extends ServerResponse {
  json: (data: Record<string, any>) => void;
}
