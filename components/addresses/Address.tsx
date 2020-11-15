import { updateAddress } from '../../fetch';
import { AddressType } from '../../types';

interface Props extends AddressType {
  isCustomerAddress?: boolean;
}

const Address = ({
  _id,
  address,
  askForReco,
  city,
  isCustomerAddress = false,
  name,
  zip,
}: Props) => (
  <li>
    <div>{`Nom : ${name}`}</div>
    <div>{`Adresse : ${address}`}</div>
    <div>{`Ville : ${city}`}</div>
    <div>{`Code postal : ${zip}`}</div>
    {isCustomerAddress && (
      <>
        <input
          checked={askForReco}
          onChange={() => updateAddress({ _id, askForReco: !askForReco })}
          type='checkbox'
        />
        <span>{` ${
          askForReco
            ? 'je ne veux plus de reco pour cette adresse'
            : 'je veux une reco pour cette adresse'
        }`}</span>
      </>
    )}
  </li>
);

export default Address;
