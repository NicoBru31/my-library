import { deleteAddress, updateAddress } from '../../fetch';
import { AddressType } from '../../types';
import CardButtons from '../utils/CardButtons';
import fields from './addressFields';

const Address = (props: AddressType) => (
  <div className='border border-solid border-black h-1/4 m-8 rounded shadow-lg p-4 w-1/4'>
    <div className='font-bold'>{props.name}</div>
    <div>{props.address}</div>
    <div>{`${props.city}, ${props.zip}`}</div>
    <CardButtons
      data={props}
      field='addresses'
      fields={fields}
      remove={deleteAddress}
      update={updateAddress}
    />
  </div>
);

export default Address;
