import { AuthAction, AuthState } from '../../../types'

const authReducer = ( state: AuthState, action: AuthAction ): AuthState => {
  switch ( action.type ) {
  case 'LOGIN': {
    window.api.auth.login( action.payload.username, action.payload.password )
    const user = window.api.database.users.getUser( action.payload.username )

    return { currentUser: user }
  }
  case 'LOGOUT': {
    window.api.auth.logout()
    return { currentUser: null }
  }
  default:
    return state
  }
}

export default authReducer
