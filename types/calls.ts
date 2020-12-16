import { IncomingMessage, ServerResponse } from 'http';
import { Db } from 'mongodb';
import { AddressType, CustomerType, ReadingType, SellerType } from '.';

export interface CreateReadingType {
  reading: ReadingType;
  id: string;
}

export interface CreateAddressType {
  address: AddressType;
  fromSeller?: boolean;
  id: string;
}

export interface Incoming extends IncomingMessage {
  body?: any;
  db: Db;
  query: {
    id?: string;
    ids?: string;
    fromSeller?: string;
    googleId?: string;
    type?: 'city' | 'department' | 'zip';
    value?: string;
  };
}

export interface Response extends ServerResponse {
  json: (data: Record<string, any>) => void;
}

export interface UpdateCustomerType {
  customer: CustomerType;
  id: string;
}

export interface UpdateSellerType {
  seller: SellerType;
  id: string;
}
