import { Session } from '../contexts/SessionContext';
import { LoginInterface } from '../pages/login';
import {
  AddressType,
  BookType,
  CreateAddressType,
  CreateReadingType,
  CustomerType,
  GoogleBookType,
  RecoBooksType,
  RecoType,
  SellerType,
  UpdateCustomerType,
  UpdateSellerType,
} from '../types';

const getURL = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  else if (!process.browser) return 'http://localhost:3000';
  return window.location.origin;
};

export const createAddress = ({
  address,
  fromSeller = false,
  id,
}: CreateAddressType) =>
  fetch(`${getURL()}/api/addresses?id=${id}&fromSeller=${fromSeller}`, {
    body: JSON.stringify(address),
    method: 'POST',
  }).then((res) => res.json());

export const createCustomer = (customer: CustomerType) =>
  fetch(`${getURL()}/api/customers`, {
    body: JSON.stringify(customer),
    method: 'POST',
  }).then((res) => res.json());

export const createReading = ({ reading, id }: CreateReadingType) =>
  fetch(`${getURL()}/api/readings`, {
    body: JSON.stringify({ ...reading, customerId: id }),
    method: 'POST',
  }).then((res) => res.json());

export const createReco = (data: RecoType) =>
  fetch(`${getURL()}/api/recos`, {
    body: JSON.stringify(data),
    method: 'POST',
  }).then((res) => res.json());

export const createSeller = (seller: SellerType) =>
  fetch(`${getURL()}/api/sellers`, {
    body: JSON.stringify(seller),
    method: 'POST',
  }).then((res) => res.json());

export const getBook = (id: string): Promise<BookType> =>
  fetch(`${getURL()}/api/books?id=${id}`).then((res) => res.json());

export const getGoogleBook = (id: string): Promise<GoogleBookType> =>
  fetch(`${getURL()}/api/google?id=${id}`).then((res) => res.json());

export const getGoogleBooks = (query: string): Promise<GoogleBookType[]> =>
  fetch(`${getURL()}/api/google?q=${query}`).then((res) => res.json());

export const getCustomer = (id: string): Promise<CustomerType> =>
  fetch(`${getURL()}/api/customers?id=${id}`).then((res) => res.json());

export const getRecos = (): Promise<RecoType[]> =>
  fetch(`${getURL()}/api/recos`).then((res) => res.json());

export const getSeller = (id: string): Promise<SellerType> =>
  fetch(`${getURL()}/api/sellers?id=${id}`).then((res) => res.json());

export const login = (
  data: LoginInterface,
  isSeller = false,
): Promise<Session> =>
  fetch(`${getURL()}/api/login${isSeller ? '?fromSeller=true' : ''}`, {
    body: JSON.stringify(data),
    method: 'POST',
  }).then((res) => res.json());

export const updateAddress = (address: Partial<AddressType>) =>
  fetch(`${getURL()}/api/addresses?id=${address._id}`, {
    body: JSON.stringify(address),
    method: 'PUT',
  }).then((res) => res.json());

export const updateCustomer = ({ customer, id }: UpdateCustomerType) =>
  fetch(`${getURL()}/api/customers?id=${id}`, {
    body: JSON.stringify(customer),
    method: 'PUT',
  }).then((res) => res.json());

export const updateReco = (data: RecoBooksType, id: string) =>
  fetch(`${getURL()}/api/recos?id=${id}`, {
    body: JSON.stringify(data),
    method: 'PUT',
  }).then((res) => res.json());

export const updateSeller = ({ seller, id }: UpdateSellerType) =>
  fetch(`${getURL()}/api/sellers?id=${id}`, {
    body: JSON.stringify(seller),
    method: 'PUT',
  }).then((res) => res.json());
