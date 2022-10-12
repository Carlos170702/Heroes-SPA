import { HeroList } from "../components";

export const MarvelPage = () => {
  const publisher = 'Marvel Comics';

  return (
    <>
      <h1>Marvel Page</h1>
      <hr />

      <ul>
        {
          <HeroList publisher={publisher} />
        }
      </ul>
    </>
  )
}
