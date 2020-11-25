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

export interface UpdateCustomerType {
  customer: CustomerType;
  id: string;
}

export interface UpdateSellerType {
  seller: SellerType;
  id: string;
}
