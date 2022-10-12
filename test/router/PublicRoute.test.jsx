import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth/context/AuthContext"
import { PublicRoute } from "../../src/router/PublicRoute"
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('pruebas en < PublicRoute />', () => {
    test('debe de mostrar el children si no esta autenticado', () => {

        const contextvalue = {
            logged: false,
        }
        render(
            <AuthContext.Provider value={contextvalue}>
                <PublicRoute >
                    <h1>Carlos</h1>
                </PublicRoute>
            </AuthContext.Provider>
        )
        expect(screen.getByText("Carlos")).toBeTruthy();
    })

    test('debe de navegar si esta autenticado', () => {
        const contextvalue = {
            logged: true,
            user: {
                name: 'striger',
                id: 'ABCD'
            }
        }
        render(
            <AuthContext.Provider value={contextvalue}>
                <MemoryRouter initialEntries={['/login']}>

                    <Routes>
                        <Route path="/login" element={
                            <PublicRoute>
                                <h1>ruta publica</h1>
                            </PublicRoute>
                        } />
                        <Route path="/marvel" element={<h1>Pagina de marvel</h1>} />
                    </Routes>

                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( screen.getByText('Pagina de marvel')).toBeTruthy();
    })

})
