import { SellerType, Field } from '../../types';

const fields: Field<SellerType>[] = [
  {
    label: 'Nom de la librairie*',
    name: 'name',
    placeholder: 'Mon magasin',
    rules: {
      required: 'Champ obligatoire',
    },
  },
  {
    label: 'E-mail*',
    name: 'email',
    placeholder: 'librairie@lbr.fr',
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
