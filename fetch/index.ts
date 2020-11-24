import { Session } from '../contexts/SessionContext';
import { LoginInterface } from '../pages/login';
import {
  AddressType,
  CustomerType,
  ReadingType,
  RecoType,
  RecoBooksType,
  SellerType,
  GoogleBookType,
  BookType,
} from '../types';

const URL = 'http://localhost:3000';

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

export const createAddress = ({
  address,
  fromSeller = false,
  id,
}: CreateAddressType) =>
  fetch(`${URL}/api/addresses?id=${id}&fromSeller=${fromSeller}`, {
    body: JSON.stringify(address),
    method: 'POST',
  }).then((res) => res.json());

export const createCustomer = (customer: CustomerType) =>
  fetch(`${URL}/api/customers`, {
    body: JSON.stringify(customer),
    method: 'POST',
  }).then((res) => res.json());

export const createReading = ({ reading, id }: CreateReadingType) =>
  fetch(`${URL}/api/readings`, {
    body: JSON.stringify({ ...reading, customerId: id }),
    method: 'POST',
  }).then((res) => res.json());

export const createReco = (data: RecoType) =>
  fetch(`${URL}/api/recos`, {
    body: JSON.stringify(data),
    method: 'POST',
  }).then((res) => res.json());

export const createSeller = (seller: SellerType) =>
  fetch(`${URL}/api/sellers`, {
    body: JSON.stringify(seller),
    method: 'POST',
  }).then((res) => res.json());

export const getBook = (id: string): Promise<BookType> =>
  fetch(`${URL}/api/books?id=${id}`).then((res) => res.json());

export const getGoogleBook = (id: string): Promise<GoogleBookType> =>
  fetch(`${URL}/api/google?id=${id}`).then((res) => res.json());

export const getGoogleBooks = (query: string): Promise<GoogleBookType[]> =>
  fetch(`${URL}/api/google?q=${query}`).then((res) => res.json());

export const getCustomer = (id: string): Promise<CustomerType> =>
  fetch(`${URL}/api/customers?id=${id}`).then((res) => res.json());

export const getRecos = (): Promise<RecoType[]> =>
  fetch(`${URL}/api/recos`).then((res) => res.json());

export const getSeller = (id: string): Promise<SellerType> =>
  fetch(`${URL}/api/sellers?id=${id}`).then((res) => res.json());

export const login = (
  data: LoginInterface,
  isSeller = false,
): Promise<Session> =>
  fetch(`${URL}/api/login${isSeller ? '?fromSeller=true' : ''}`, {
    body: JSON.stringify(data),
    method: 'POST',
  }).then((res) => res.json());

export const updateAddress = (address: Partial<AddressType>) =>
  fetch(`${URL}/api/addresses?id=${address._id}`, {
    body: JSON.stringify(address),
    method: 'PUT',
  }).then((res) => res.json());

export const updateCustomer = ({ customer, id }: UpdateCustomerType) =>
  fetch(`${URL}/api/customers?id=${id}`, {
    body: JSON.stringify(customer),
    method: 'PUT',
  }).then((res) => res.json());

export const updateReco = (data: RecoBooksType, id: string) =>
  fetch(`${URL}/api/recos?id=${id}`, {
    body: JSON.stringify(data),
    method: 'PUT',
  }).then((res) => res.json());

export const updateSeller = ({ seller, id }: UpdateSellerType) =>
  fetch(`${URL}/api/sellers?id=${id}`, {
    body: JSON.stringify(seller),
    method: 'PUT',
  }).then((res) => res.json());
