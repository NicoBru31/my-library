import { LoginInterface } from '../pages/login';
import { AddressType, CustomerType, ReadingType } from '../types';
const URL = window.location.hostname;

export interface CreateReadingType {
  reading: ReadingType;
  id: string;
}

export interface CreateAddressType {
  address: AddressType;
  id: string;
}

export interface UpdateCustomerType {
  customer: CustomerType;
  id: string;
}

export const createAddress = ({ address, id }: CreateAddressType) =>
  fetch(`${URL}/api/addresses?id=${id}`, {
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

export const getAddresses = (id: string) =>
  fetch(`${URL}/api/addresses?id=${id}`).then((res) => res.json());

export const getCustomer = (id: string) =>
  fetch(`${URL}/api/customers?id=${id}`).then((res) => res.json());

export const login = (data: LoginInterface) =>
  fetch(`${URL}/api/login`, {
    body: JSON.stringify(data),
    method: 'POST',
  }).then((res) => res.json());

export const updateCustomer = ({ customer, id }: UpdateCustomerType) =>
  fetch(`${URL}/api/customers?id=${id}`, {
    body: JSON.stringify(customer),
    method: 'PUT',
  }).then((res) => res.json());
