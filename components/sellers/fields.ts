import { SellerType, Field } from '../../types';

const fields: Field<SellerType>[] = [
  {
    name: 'name',
    placeholder: 'Nom du magasin',
    rules: {
      required: 'Champ obligatoire',
    },
  },
  {
    name: 'email',
    placeholder: 'e-email',
    type: 'email',
    rules: {
      required: 'Champ obligatoire',
    },
  },
  {
    name: 'password',
    placeholder: 'Mot de passe',
    type: 'password',
    rules: {
      required: 'Champ obligatoire',
    },
  },
];

export default fields;
