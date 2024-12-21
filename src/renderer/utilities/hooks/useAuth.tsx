import { useState } from 'react'

import { AuthAction, AuthState } from '../../../types'
import { AuthReducer } from '../reducers/auth.reducer'

const useAuth = ( reducer: AuthReducer, initialState: AuthState ) => {
  const [ state, setState ] = useState<AuthState>( initialState )

  const dispatch = async ( action: AuthAction ) => {
    const result = reducer( state, action )
    if ( typeof result.then === 'function' ) {
      try {
        const newState = await result
        setState( newState )
      } catch ( err: unknown ) {
        console.error( err )
      }
    } else {
      console.error( 'reducer did not return a promise' )
    }
  }

  return { state, dispatch }
}

export default useAuth
