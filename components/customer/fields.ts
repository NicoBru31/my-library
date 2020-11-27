import { CustomerType, Field } from './../../types/index';

const fields: Field<CustomerType>[] = [
  {
    label: 'Prénom*',
    name: 'firstName',
    placeholder: 'Frédéric',
    rules: {
      required: 'Champ obligatoire',
    },
  },
  {
    label: 'Nom*',
    name: 'lastName',
    placeholder: 'Bastiat',
    rules: {
      required: 'Champ obligatoire',
    },
  },
  {
    label: 'E-mail*',
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
    label: 'Mot de passe',
    name: 'password',
    placeholder: 'Mot de passe',
    type: 'password',
  },
];

export default fields;
