import { SellerType, Field } from '../../types';

const fields: Field<SellerType>[] = [
  {
    label: 'Nom de la librairie*',
    name: 'name',
    placeholder: 'Nom du magasin',
    rules: {
      required: 'Champ obligatoire',
    },
  },
  {
    label: 'E-mail*',
    name: 'email',
    placeholder: 'e-email',
    type: 'email',
    rules: {
      required: 'Champ obligatoire',
    },
  },
  {
    label: 'Mot de passe*',
    name: 'password',
    placeholder: 'Mot de passe',
    type: 'password',
    rules: {
      required: 'Champ obligatoire',
    },
  },
];

export default fields;
