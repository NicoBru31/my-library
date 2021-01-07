import { Session } from '../contexts/SessionContext';
import { LoginInterface } from '../pages/login';
import {
  AddressType,
  BookType,
  CreateAddressType,
  CreateReadingType,
  CustomerType,
  GoogleBookType,
  ReadingType,
  RecoBooksType,
  RecoType,
  SellerType,
  UpdateCustomerType,
} from '../types';

export const createAddress = ({
  address,
  fromSeller = false,
  id,
}: CreateAddressType) =>
  fetch(
    `${window.location.origin}/api/addresses?id=${id}&fromSeller=${fromSeller}`,
    {
      body: JSON.stringify(address),
      method: 'POST',
    },
  ).then((res) => res.json());

export const createBook = (book: GoogleBookType): Promise<BookType> =>
  fetch(`${window.location.origin}/api/books`, {
    body: JSON.stringify(book),
    method: 'POST',
  }).then((res) => res.json());

export const createCustomer = (customer: CustomerType) =>
  fetch(`${window.location.origin}/api/customers`, {
    body: JSON.stringify(customer),
    method: 'POST',
  }).then((res) => res.json());

export const createReading = ({ reading, id }: CreateReadingType) =>
  fetch(`${window.location.origin}/api/readings`, {
    body: JSON.stringify({ ...reading, customerId: id }),
    method: 'POST',
  }).then((res) => res.json());

export const createReco = (data: RecoType) =>
  fetch(`${window.location.origin}/api/recos`, {
    body: JSON.stringify(data),
    method: 'POST',
  }).then((res) => res.json());

export const createSeller = (seller: SellerType) =>
  fetch(`${window.location.origin}/api/sellers`, {
    body: JSON.stringify(seller),
    method: 'POST',
  }).then((res) => res.json());

export const deleteAddress = (id: string): Promise<{ id: string }> =>
  fetch(`${window.location.origin}/api/addresses?id=${id}`, {
    method: 'DELETE',
  }).then((res) => res.json());

export const deleteReading = (id: string): Promise<{ id: string }> =>
  fetch(`${window.location.origin}/api/readings?id=${id}`, {
    method: 'DELETE',
  }).then((res) => res.json());

export const getBook = (id: string): Promise<BookType> =>
  fetch(`${window.location.origin}/api/books?id=${id}`).then((res) =>
    res.json(),
  );

export const getBooks = (url: string, ids: string[]): Promise<BookType[]> =>
  fetch(`${url}/api/books?ids=${ids.join(',')}`).then((res) => res.json());

export const getBookByGoogleId = (id: string): Promise<BookType> =>
  fetch(`${window.location.origin}/api/books?googleId=${id}`).then((res) =>
    res.json(),
  );

export const getGoogleBooks = (query: string): Promise<GoogleBookType[]> =>
  fetch(`${window.location.origin}/api/google?q=${query}`).then((res) =>
    res.json(),
  );

export const getCustomer = (url: string, id: string): Promise<CustomerType> =>
  fetch(`${url}/api/customers?id=${id}`).then((res) => res.json());

export const getReadings = (
  url: string,
  ids: string[],
): Promise<ReadingType[]> =>
  fetch(`${url}/api/readings?ids=${ids.join(',')}`).then((res) => res.json());

export const getRecos = (url: string, sellerId: string): Promise<RecoType[]> =>
  fetch(`${url}/api/recos?fromSeller=${sellerId}`).then((res) => res.json());

export const getSeller = (url: string, id: string): Promise<SellerType> =>
  fetch(`${url}/api/sellers?id=${id}`).then((res) => res.json());

export const getSellers = (url: string, ids: string[]): Promise<SellerType[]> =>
  fetch(`${url}/api/sellers?ids=${ids.join(',')}`).then((res) => res.json());

export const login = (
  data: LoginInterface,
  isSeller = false,
): Promise<Session> =>
  fetch(
    `${window.location.origin}/api/login${isSeller ? '?fromSeller=true' : ''}`,
    {
      body: JSON.stringify(data),
      method: 'POST',
    },
  ).then((res) => res.json());

export const patchReco = (
  id: string,
  recoId: string,
): Promise<{ notified: string[] }> =>
  fetch(`${window.location.origin}/api/recos`, {
    body: JSON.stringify({ id, recoId }),
    method: 'PATCH',
  }).then((res) => res.json());

export const updateAddress = (address: Partial<AddressType>) =>
  fetch(`${window.location.origin}/api/addresses?id=${address._id}`, {
    body: JSON.stringify(address),
    method: 'PUT',
  }).then((res) => res.json());

export const updateCustomer = ({ customer, id }: UpdateCustomerType) =>
  fetch(`${window.location.origin}/api/customers?id=${id}`, {
    body: JSON.stringify(customer),
    method: 'PUT',
  }).then((res) => res.json());

export const updateReading = (reading: ReadingType): Promise<ReadingType> =>
  fetch(`${window.location.origin}/api/readings?id=${reading._id}`, {
    body: JSON.stringify(reading),
    method: 'PUT',
  }).then((res) => res.json());

export const updateReco = (
  data: RecoBooksType,
  id: string,
): Promise<RecoType> =>
  fetch(`${window.location.origin}/api/recos?id=${id}`, {
    body: JSON.stringify(data),
    method: 'PUT',
  }).then((res) => res.json());

export const updateSeller = ({
  _id,
  ...seller
}: SellerType): Promise<SellerType> =>
  fetch(`${window.location.origin}/api/sellers?id=${_id}`, {
    body: JSON.stringify(seller),
    method: 'PUT',
  }).then((res) => res.json());
