import { createContext } from 'react'

import { AuthAction, AuthState } from '../../../types'

export const createInitialAuthState = (): AuthState => {
  let initialUser = null

  if (window.env.SKIP_LOGIN) {
    initialUser = {
      "id": 1,
      "username": "slowe",
      "password": window.env.SKIP_LOGIN_HASHED_PASSWORD ?? '', // should always be there
      "firstName": "Sean",
      "lastName": "Lowe",
      "role": "player"
    }
  }

  return {
    currentUser: initialUser,
  }
}

const initialAuthDispatch: React.Dispatch<AuthAction> = () => {
  if (window.env.SKIP_LOGIN) {
    return {
      type: 'LOGIN',
      payload: { username: window.env.SKIP_LOGIN_USERNAME, password: window.env.SKIP_LOGIN_PASSWORD },
    }
  }

  return null
}

export const AuthContext = createContext<{
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
}>({ state: createInitialAuthState(), dispatch: initialAuthDispatch })
