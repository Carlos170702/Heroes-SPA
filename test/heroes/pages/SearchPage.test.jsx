import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    //que extraiga todo lo que tiene el react-router-dom
    ...jest.requireActual('react-router-dom'),
    //y solo se sobrescribe esta funcion
    useNavigate: () => mockedUseNavigate
}))

describe('pruebas en <SearchPage />', () => {
    beforeEach( () => jest.clearAllMocks() )
    test('debe de mostrarse correctamente con valores por defecto', () => {

        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();

    })


    test('debe mostrar a Batman y el input con el valor de queryString ', () => {
        render(
            <MemoryRouter initialEntries={['search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman')

        const img = screen.getByRole('img');
        expect(img.src).toContain("/assets/heroes/dc-batman.jpg")

        const divNone = screen.getByLabelText('divNone')
        const { style: { display } } = divNone
        expect(display).toBe('none');
    })

    test('debe de mostrar un error si no encuentra el heroe (batman123)', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        )

        const divNone = screen.getByLabelText('divNoHero')
        expect(divNone.style.display).toBe('');
    })

    test('debe de llamar al navigate a la pantalla nueva', () => {
        const inputValue = 'batman';
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        )

        // screen.debug();

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { name: 'searchText', value: inputValue} })

        const form = screen.getByRole('form')
        fireEvent.submit(form)

        expect(mockedUseNavigate).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${ inputValue}`);

    })
})
