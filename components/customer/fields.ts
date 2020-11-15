import { CustomerType, Field } from './../../types/index';

const fields: Field<CustomerType>[] = [
  {
    name: 'firstName',
    placeholder: 'Frédéric',
    rules: {
      required: 'Champ obligatoire',
    },
  },
  {
    name: 'lastName',
    placeholder: 'Bastiat',
    rules: {
      required: 'Champ obligatoire',
    },
  },
  {
    name: 'email',
    placeholder: 'toto@to.to',
    rules: {
      required: 'Champ obligatoire',
      pattern: {
        message: 'Adresse e-email invalide',
        value: /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i,
      },
    },
    type: 'email',
  },
  {
    name: 'password',
    placeholder: 'Mot de passe',
    type: 'password',
  },
];

export default fields;
