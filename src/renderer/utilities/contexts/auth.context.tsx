import { createContext } from 'react'
import { AuthAction, AuthState } from '../../../types'

export const initialAuthState: AuthState = {
  currentUser: null,
}

const initialAuthDispatch: React.Dispatch<AuthAction> = () => {
  return null
}

export const AuthContext = createContext<{
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
}>({ state: initialAuthState, dispatch: initialAuthDispatch })
