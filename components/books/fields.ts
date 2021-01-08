import { BookType, Field } from '../../types';

const fields: Field<BookType>[] = [
  {
    label: 'Titre',
    name: 'title',
    placeholder: 'Moby Dick',
    rules: { required: 'Champ requis' },
  },
  {
    label: 'Auteur',
    name: 'author',
    placeholder: 'Herman Melville',
    rules: { required: 'Champ requis' },
  },
];

export default fields;
