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
    label: 'Téléphone',
    maxLength: 10,
    name: 'phone',
    placeholder: '0102030405',
    rules: {
      pattern: {
        message: 'Le numéro de téléphone doit être au format 0102030405',
        value: /0[0-9]{9}/,
      },
      required: 'Champ obligatoire',
    },
  },
  {
    label: 'Site internet',
    name: 'site',
    placeholder: 'https://ma-librairie.com',
    type: 'url',
  },
  {
    label: 'Mot de passe*',
    name: 'password',
    placeholder: 'Mot de passe',
    type: 'password',
  },
];

export default fields;
