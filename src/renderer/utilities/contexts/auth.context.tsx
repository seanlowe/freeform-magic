import { createContext } from 'react'
import { AuthAction, AuthState } from '../../../types'

const loggedOutState: AuthState = {
  currentUser: null,
}

const AuthContext = createContext<{
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
} | null>( null )

export { AuthContext, loggedOutState }
