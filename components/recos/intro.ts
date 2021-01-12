interface IntroInterface {
  text: string;
  image: string;
}

const intro: IntroInterface[] = [
  {
    text: 'Je choisis une ou plusieurs adresses',
    image: '/select.webp',
  },
  {
    text: 'Je sélectionne mes lectures',
    image: '/select-book.png',
  },
  {
    text: "J'attends les recommendations",
    image: '/wait.png',
  },
];

export default intro;
