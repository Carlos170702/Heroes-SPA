import { AuthReducer } from "../../../src/auth";
import { types } from "../../../src/auth";
import {} from "../../../src/auth/types/types";

describe(" pruebas en AuthReducer", () => {
  test(" debe de retornar el estado por defecto", () => {
    const state = AuthReducer({ logged: false }, {});
    expect(state).toEqual({ logged: false });
  });

  test(" debe de (login) llamar al login autenticar y restablecer el user", () => {
    const action = {
      type: types.login,
      payload: { id: "ABC", name: "carlos" },
    };
    const state = AuthReducer({ logged: false }, action);
    expect(state).toEqual({
      logged: true,
      user: action.payload,
    });
  });

  test("debe de (logout) borrar el name del usuario y logged en false", () => {
    const state = { 
      logged: false,
      user: {
        id: "ABC",
        name: "carlos",
      }
    }

    const action = {
      type: types.Logout,
    };

    const statedo = AuthReducer(state, action);
    expect(statedo).toEqual( { logged: false} );
  });
});
