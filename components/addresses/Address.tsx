import { AddressType } from '../../types';
import DeleteAddress from './DeleteAddress';
import UpdateAddress from './UpdateAddress';

const Address = (props: AddressType) => (
  <div className='border border-solid border-black h-1/4 m-8 rounded shadow-lg p-4 w-1/4'>
    <div className='font-bold'>{name}</div>
    <div>{props.address}</div>
    <div>{`${props.city}, ${props.zip}`}</div>
    <div className='flex justify-end mt-2'>
      <UpdateAddress {...props} />
      <DeleteAddress id={props._id} />
    </div>
  </div>
);

export default Address;
