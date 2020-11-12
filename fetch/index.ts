import { AddressType, CustomerType, ReadingType } from '../types';

const { VERCEL_URL = 'http://localhost:3000' } = process.env;

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
  fetch(`${VERCEL_URL}/api/addresses?id=${id}`, {
    body: JSON.stringify(address),
    method: 'POST',
  }).then((res) => res.json());

export const createCustomer = (customer: CustomerType) =>
  fetch(`${VERCEL_URL}/api/customers`, {
    body: JSON.stringify(customer),
    method: 'POST',
  }).then((res) => res.json());

export const createReading = ({ reading, id }: CreateReadingType) =>
  fetch('${VERCEL_URL}/api/readings', {
    body: JSON.stringify({ ...reading, customerId: id }),
    method: 'POST',
  }).then((res) => res.json());

export const getAddresses = (id: string) =>
  fetch(`${VERCEL_URL}/api/addresses?id=${id}`).then((res) => res.json());

export const getCustomer = (id: string) =>
  fetch(`${VERCEL_URL}/api/customers?id=${id}`).then((res) => res.json());

export const updateCustomer = ({ customer, id }: UpdateCustomerType) =>
  fetch(`${VERCEL_URL}/api/customers?id=${id}`, {
    body: JSON.stringify(customer),
    method: 'PUT',
  }).then((res) => res.json());
