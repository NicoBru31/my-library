import { LoginInterface } from '../pages/login';
import {
  AddressType,
  CustomerType,
  ReadingType,
  RecoType,
  SellerType,
} from '../types';

let URL = 'http://localhost:3000';
if (process.browser && !window.location.hostname.includes('localhost'))
  URL = window.location.hostname;

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

export const getCustomer = (id: string) =>
  fetch(`${URL}/api/customers?id=${id}`).then((res) => res.json());

export const getSeller = (id: string) =>
  fetch(`${URL}/api/sellers?id=${id}`).then((res) => res.json());

export const login = (data: LoginInterface, isSeller = false) =>
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

export const updateSeller = ({ seller, id }: UpdateSellerType) =>
  fetch(`${URL}/api/sellers?id=${id}`, {
    body: JSON.stringify(seller),
    method: 'PUT',
  }).then((res) => res.json());
