export interface CardInterface {
  alt: string;
  img: string;
  search?: string;
  text: string;
  title: string;
}

const cards: CardInterface[] = [
  {
    alt: 'book seller',
    img: '/seller.svg',
    search: 'isSeller=true',
    title: 'JE SUIS\n LIBRAIRE',
    text:
      'Je souhaite échanger avec les lecteurs de mon quartier et leur faire des recommendations',
  },
  {
    alt: 'book reader',
    img: '/reader.svg',
    title: 'JE SUIS\n LECTEUR',
    text:
      'Je souhaite découvrir de nouveaux livres auprès des libraires mon quartier',
  },
];

export default cards;
