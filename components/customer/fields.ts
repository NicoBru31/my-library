import { CustomerType, Field } from './../../types/index';

const fields: Field<CustomerType>[] = [
  {
    label: 'Prénom*',
    name: 'firstName',
    placeholder: 'Alexandre',
    rules: {
      required: 'Champ obligatoire',
    },
  },
  {
    label: 'Nom*',
    name: 'lastName',
    placeholder: 'Dumas',
    rules: {
      required: 'Champ obligatoire',
    },
  },
  {
    label: 'E-mail*',
    name: 'email',
    placeholder: 'alexandre@dumas.fr',
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
