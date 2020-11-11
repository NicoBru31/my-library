import { Field, ReadingType } from './../../types/index';

const fields: Field<ReadingType>[] = [
  {
    name: 'author',
    placeholder: 'Auteur',
  },
  {
    name: 'name',
    placeholder: "nom de l'oeuvre",
  },
  {
    name: 'comments',
    placeholder: 'commentaire',
    textarea: true,
  },
  {
    name: 'rating',
    placeholder: 'note sur 20',
    type: 'number',
    max: 20,
    min: 0,
  },
];

export default fields;
