import { LoginInterface } from '../../pages/login';
import { Field } from '../../types';

const loginFields: Field<LoginInterface>[] = [
  {
    label: 'E-mail',
    name: 'email',
    placeholder: 'victo@hugo.fr',
    rules: {
      required: 'Champ obligatoire',
      pattern: {
        value: /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/,
        message: "Ce n'est pas une adresse e-mail",
      },
    },
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
