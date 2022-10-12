import { HeroList } from "../components"

export const DcPage = () => {
  const publisher = 'DC Comics';
  return (
    <>
      <h1>DC Page</h1>
      <hr />

      <ul>
        {
          <HeroList publisher={publisher} />
        }
      </ul>

    </>
  )
}
