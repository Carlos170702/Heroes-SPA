import { useMemo } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getHeroById } from '../helpers/getHeroById';

export const HeroPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const heroe =useMemo( () => getHeroById(id),[id]) ;

  const heroeImage = `/assets/heroes/${id}.jpg`

  const onBackPage =() => {
    navigate( -1 );
  }

  if (!heroe) {
    return <Navigate to="/marvel" />
  }

  return (
    <>
      <div className='fullHero animate__animated animate__bounceIn '>
        <div className="heroData">

          <div className="imgHeroes animate__rotateOut">
                <img src={heroeImage} alt={heroe.superhero} className="imgHeroe" />
          </div>

          <div className='infHeroes'>
            <h3 className="card-tittle" >{ heroe.superhero}</h3>
            <ul className='list' >
              <li className='list-item'><b>Alter Ego: </b> { heroe.alter_ego } </li>
              <li className='list-item'><b>Publisher: </b> { heroe.publisher } </li>
              <li className='list-item'><b>First appearance: </b> { heroe.first_appearance } </li>
            </ul>

            <h5 className='mt-3'>Characters</h5>
            <p>{ heroe.characters }</p>


            <button 
              className='btn btn-outline-primary mt-10'
              onClick={ onBackPage}
            >
              Return 
            </button>
          </div>
          
        </div>
      </div>
    </>
  )
}
