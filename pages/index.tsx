import Card from '../components/home/Card';
import cards from '../components/home/cards';
import Intro from '../components/utils/Intro';
import intro from '../components/home/intro';

const Home = () => (
  <div className='home-picture'>
    <Intro {...intro} />
    <div className='md:flex justify-around items-center'>
      {cards.map((card) => (
        <Card {...card} key={card.alt} />
      ))}
    </div>
  </div>
);

export default Home;
