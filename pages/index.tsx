import Card from '../components/home/Card';
import cards from '../components/home/cards';
import Intro from '../components/home/Intro';

const Home = () => (
  <div className='home-picture'>
    <Intro />
    <div className='flex justify-around items-center'>
      {cards.map((card) => (
        <Card {...card} key={card.alt} />
      ))}
    </div>
  </div>
);

export default Home;
