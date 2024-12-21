import ErrorObject from '../../../main/error/error.object'
import { AuthAction, AuthState } from '../../../types'

export type AuthReducer = ( state: AuthState, action: AuthAction ) => Promise<AuthState>

// takes auth state and a dispatch payload and returns a new state
const authReducer: AuthReducer = async (
  state: AuthState,
  action: AuthAction
): Promise<AuthState> => {
  switch ( action.type ) {  
  case 'LOGIN': {
    const response = await window.api.auth.login( action.payload.username, action.payload.password )

    if ( response !== undefined && typeof response === 'object' ) {
      throw new ErrorObject( '[ AUTH.REDUCER ] Login failed' )
    }

    const user = await window.api.database.users.getUser( action.payload.username )
    
    return { currentUser: user }
  }
  case 'LOGOUT': {
    await window.api.auth.logout()

    return { currentUser: null }
  }
  default:
    return state
  }
}

export default authReducer
