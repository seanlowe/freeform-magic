import { useState } from 'react'

import ErrorObject from '../../../main/error/error.object'
import { AuthAction, AuthState } from '../../../types'
import { AuthReducer } from '../reducers/auth.reducer'

const useAuth = ( reducer: AuthReducer, initialState: AuthState ) => {
  const [ state, setState ] = useState<AuthState>( initialState )

  const dispatch = async ( action: AuthAction ): Promise<ErrorObject | void> => {
    const result = reducer( state, action )
    if ( typeof result.then === 'function' ) {
      try {
        const newState = await result
        setState( newState )
      } catch ( err: unknown ) {
        console.error( err )

        return err as ErrorObject
      }
    } else {
      console.error( 'reducer did not return a promise' )
    }
  }

  return { state, dispatch }
}

export default useAuth
