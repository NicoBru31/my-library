import Card from '../components/home/Card';
import cards from '../components/home/cards';
import intro from '../components/home/intro';
import Intro from '../components/utils/Intro';

const Home = () => (
  <div className='home-picture'>
    <Intro {...intro} />
    <div className='pb-12 md:flex justify-around items-center'>
      {cards.map((card) => (
        <Card {...card} key={card.alt} />
      ))}
    </div>
  </div>
);

export default Home;
