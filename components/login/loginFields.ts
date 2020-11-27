import { LoginInterface } from '../../pages/login';
import { Field } from '../../types';

const loginFields: Field<LoginInterface>[] = [
  {
    label: 'E-mail',
    name: 'email',
    placeholder: 'toto@to.to',
    rules: { required: 'Champ obligatoire' },
    type: 'email',
  },
  {
    label: 'Mot de passe',
    name: 'password',
    placeholder: 'Mot de passe',
    rules: { required: 'Champ obligatoire' },
    type: 'password',
  },
];

export default loginFields;
