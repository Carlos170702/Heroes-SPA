import { useContext } from 'react';
import { Link, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../../auth/context/AuthContext';


export const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
    //esto es un customHook de react-router-dom que te da opciones de regresar o agregar etc...
    const navigate = useNavigate();
    const onLogout = () => {
        logout()
        //el navegate es un metodo de react-router-dom que te manda a una pagina especifica que es llamado como "to" y el siguiente parametro es un objeto que le puedes poner el replace para que remplace la pantalla actual a el login
        navigate('/login', {
            //replace sirve para evitar que regrese al historial anterior
            replace: true,
        })
    }
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">

            <Link
                className="navbar-brand"
                to="/"
            >
                Asociaciones
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink
                        className="nav-item nav-link"
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink
                        className="nav-item nav-link"
                        to="/dc"
                    >
                        DC
                    </NavLink>

                    <NavLink
                        className="nav-item nav-link"
                        to="/search"
                    >
                        Search
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end mt10">
                <ul className="navbar-nav ml-auto">

                    <div className="perfil">
                        <img
                            className='img-perfil'
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAAXNSR0IArs4c6QAAAkVJREFUaEPtmOExBEEQhd9FgAgQATIgAkSADIgAESACREAGiAAZEAEioD61ezU3t7vdc7Wz7tRM1dX+mJ6eN69fd8/cSAs4RguIWQV0FbVlSfzeckUxB9Pbkh4q0CeS7vsGnxN0jfVI0k2fwIcAjUzWFw00eGE61vinpCdJL6kHGoJpCxOaR0IcwjXmATRAYXvHC3xeQCcBbwK9J+lA0qOkK1e8Jo3qkte29F3SZcXqsaSNwBDdh9pHMrdx2YxB0xQ+Aif7M9RZC3To81DStYOYlVA6Meh4w3NJZw6noYkFeiuoGET1zuEfvRP532ExTYKwScqwQLM5nZLQX0gCuDU6QbMYTa0GXiYWWN4lWaAdLqZMaE5jrTclIskBA+FAIjBEM7DGpqRnyyhh/lUSPsejCTTJiCxCtr171Anz7V3gsENKVJtO0ExyMphdcjgNTerLEV1uN3Ftk/mXpLW46XQ1FxgHeFhHLRzYkwNsRLRSDx37n2IZA6sjouVTC2k0X9dhbw1uc09jI7+mRg7QlDKynS+VBKmkME7iAXZcl2PUOUCzR3gBQmZcTbs0jnY5HAlnXlVzgQY4TCOVmjGSm0bClwjAPqwCFMC9XU1n0XQcTVjmOhA/AkjWmR6/OZmOwRN2DsAXht3MDqVpT8GxCGv1YS3sQx5tm1t7F9Ce0HtsCtMhS/9K0ykPg7aDDy6PAtqTtaGNFaK20BamC9PVHzVNL5cijyKP6lXNZb3pbuy9D7O+yUfrG9Bi3ip51vo/mS+gh6L9B+X/ji7vojSfAAAAAElFTkSuQmCC"
                        />
                        <span className="nav-item nav-link text-primary">
                            {user?.name}
                        </span>
                    </div>

                    <button
                        onClick={onLogout}
                        className="nav-item nav-link btn"
                    >
                        logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}