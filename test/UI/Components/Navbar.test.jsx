import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth/context/AuthContext";
import { Navbar } from "../../../src/UI/Components/Navbar";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    //que extraiga todo lo que tiene el react-router-dom
    ...jest.requireActual('react-router-dom'),
    //y solo se sobrescribe esta funcion
    useNavigate: () => mockedUseNavigate
}))

describe('pruebas en <Navbar />', () => {

    const contextvalue = {
        logged: true,
        user: {
            id: 'ABC',
            name: 'carlitos'
        },
        logout: jest.fn(),
    }

    beforeEach(() => jest.clearAllMocks);

    test('debe de regresar el usuario', () => {


        render(
            <MemoryRouter initialEntries={['/marvel']} >
                <AuthContext.Provider value={contextvalue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText(contextvalue.user.name)).toBeTruthy();
    })

    test('debe de llamar el logout y navigate cuando se hace click en el boton', () => {

        render(
            <MemoryRouter>
                <AuthContext.Provider value={contextvalue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const boton = screen.getByRole('button');
        fireEvent.click(boton);

        expect(contextvalue.logout).toHaveBeenCalled();
        expect(mockedUseNavigate ).toHaveBeenCalledWith("/login", {"replace": true});
    })

})