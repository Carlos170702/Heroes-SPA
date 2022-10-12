import { useForm } from "../../hooks/useForm";
import querystring from 'query-string'; //se installa query-string
import { useNavigate, useLocation } from 'react-router-dom';
import { getHeroesByName } from "../helpers";
import { HeroCard } from "../components/HeroCard";


export const SearchPage = () => {

  const navigate = useNavigate();
  //sirve para traer la localisacion donde estoy
  const location = useLocation();

  //se usa query-string se parsea el arreglo de localisacion
  const { q = '' } = querystring.parse(location.search);
  const heroes = getHeroesByName(q)

  const { formState: { searchText }, onInputChange } = useForm({
    searchText: q
  });

  const onSubmit = (e) => {
    e.preventDefault();
    //esto navega ala misma pagina pero con un queryparameters 
    navigate(`?q=${searchText}`);
  }

  return (
    <>
      <h1>SearchPage</h1>
      <hr />

      <div className="search">

        <div className="search-heroes">
          <div className="search-heroe">
            <h4>Searching</h4>
            <form
            aria-label="form"
              className="mt-2"
              onSubmit={onSubmit}
            >
              <input
                type="text"
                placeholder="Search a hero "
                className="form-control mt-2"
                name="searchText"
                autoComplete="off"
                onChange={onInputChange}
                value={searchText}
              />
              <button
                className="btn btn-outline-primary mt-2"
              >
                Search
              </button>
            </form>
          </div>

          <div className="results-heroe">
            <h4>Results</h4>

            {/* {
              (q === '')
                ? <div className="alert alert-primary mt'2">Search Hero</div>
                : (heroes.length === 0) && <div className="alert alert-danger mt-2">no hero with <b>{q}</b></div>
            } */}


            <div
              aria-label="divNone"
              className="alert alert-primary mt-2 animate__animated animate__fadeIn"
              style={{ display: q === '' ? '' : 'none' }}
            >
              Search Hero
            </div>

            <div
              aria-label="divNoHero"
              className="alert alert-danger mt-2 animate__animated animate__fadeIn"
              style={{ display: heroes.length === 0 && q.length > 0 ? '' : 'none' }}
            >
              no hero with <b>{q}</b>
            </div>

            {
              heroes.map(heroe => (
                < HeroCard key={heroe.id} {...heroe} />
              ))
            }
          </div>
        </div>

      </div>
    </>
  )
}
