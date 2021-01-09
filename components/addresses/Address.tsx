import { deleteAddress, updateAddress } from '@/fetch/index';
import { AddressType } from '@/types/index';
import CardButtons from '../utils/CardButtons';
import fields from './addressFields';

const Address = (props: AddressType) => (
  <div className='reading p-4 text-white'>
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
