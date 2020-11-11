import Link from 'next/link';

const Home = () => (
  <>
    <h1 className='H1'>Bienvenue !</h1>
    <div>
      <Link href='/customers'>
        <div className='Link'>Vous êtes client ?</div>
      </Link>
    </div>
    <div>
      <Link href='/sellers'>
        <div className='Link'>Vous êtes libraire ?</div>
      </Link>
    </div>
    <div>
      <h2>Découvrez le projet :</h2>
      <div>
        Cette plateforme permet aux lecteurs et aux libraires de leur quartier
        de se mettre en relation pour améliorer leur expérience de lecture.
      </div>
      <div>
        Le lecteur renseigne ses lectures et ses coups de coeur, il peut ensuite
        demander une recommandation aux libraires de son quartier et aller
        chercher son choix.
      </div>
    </div>
  </>
);

export default Home;
