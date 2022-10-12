import { useReducer } from 'react'
import { AuthContext } from './AuthContext'
import { AuthReducer } from './AuthReducer'

import { types } from '../types/types'

export const AuthProvider = ({ children }) => {

  //esto ase que cuando se logee agrege a localstorage el usuario y cuando recarge la aplicasion agarre los datos que estan guardados en la localStorage y los ponga en la pagina
  const init = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
      logged: !!user,
      user: user,
    }
  }

  const [authState, dispatch] = useReducer(AuthReducer, {}, init)

  const logout = () => {
    const action = { type: types.Logout }
    localStorage.clear()
    dispatch(action)
  }

  const login = (name = '') => {

    const user = { id: 'ABC', name };

    const action = { type: types.login, payload: user }

    //en el localStorage solo se puede agregar strings por eso se convierte con el json.stringify 
    localStorage.setItem('user', JSON.stringify(user))

    dispatch(action)
  }

  return (
    <>
      <AuthContext.Provider value={{ ...authState, login, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  )
}
