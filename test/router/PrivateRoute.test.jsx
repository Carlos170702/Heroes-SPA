import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth/context/AuthContext";
import { PrivateRoute } from "../../src/router/PrivateRoute";

describe('pruebas en PrivateRoute.js', () => {

    test('debe de mostrar el children si esta autenticado ', () => {
        Storage.prototype.setItem = jest.fn();

        const contextvalue = {
            logged: true,
            user: {
                name: 'John',
                id: 'ABCD'
            }
        }

        render(
            <AuthContext.Provider value={contextvalue}>
                <MemoryRouter initialEntries={['/search']}>
                    <PrivateRoute >
                        <h1>Ruta Privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )
            expect(screen.getByText('Ruta Privada')).toBeTruthy()
            expect( localStorage.setItem ).toHaveBeenCalledWith("lastPath", "/search")
    })


})