import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { MarvelPage } from "../../src/heroes/pages";
import { AppRouter } from "../../src/router/AppRouter";

describe('pruebas en <AppRouter />', () => {
    test('debe de mostrar el login si no esta autenticado', () => {

        const contextvalue = {
            logged: false,
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextvalue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        //esta debe ser con All por que si se pone como los demas routers da error por que hay mas de un "Login" se tiene que poner  "getAllByText" y el "length"
        expect(screen.getAllByText('Login').length).toBe(2);
    })


    test('debe de mostrar el componente de Marvel si esta autenticado', () => {
        const contextvalue = {
            logged: true,
            user: {
                id: '1112',
                name: 'carlitos',
            }
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextvalue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );
           expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);
    })
})