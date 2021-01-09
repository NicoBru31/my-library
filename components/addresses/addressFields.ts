import { AddressType, Field } from '@/types/index';

const fields: Field<AddressType>[] = [
  {
    label: "Nom de l'adresse*",
    name: 'name',
    placeholder: 'Maison',
    rules: {
      required: 'Champ obligatoire',
    },
  },
  {
    label: 'Adresse*',
    name: 'address',
    placeholder: '5 rue du Chapeau Rouge',
    rules: {
      required: 'Champ obligatoire',
    },
  },
  {
    label: 'Ville*',
    name: 'city',
    placeholder: 'Lyon',
    rules: {
      required: 'Champ obligatoire',
    },
  },
  {
    label: 'Code postal*',
    maxLength: 5,
    name: 'zip',
    placeholder: '69009',
    rules: {
      required: 'Champ obligatoire',
      pattern: {
        message: 'Un code postal doit être composé de 5 chiffres',
        value: /[0-9]{5}/,
      },
    },
  },
];

export default fields;
