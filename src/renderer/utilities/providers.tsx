import React, { ReactNode } from 'react'

import { ActionsContext } from './contexts/actions.context'
import { AuthContext, initialAuthState } from './contexts/auth.context'
import { LocationContext } from './contexts/location.context'
import useActions from './hooks/useActions'
import useAuth from './hooks/useAuth'
import useLocation from './hooks/useLocation'
import authReducer from './reducers/auth.reducer'

const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { state: authState, dispatch: authDispatch } = useAuth( authReducer, initialAuthState )
  const { state: locationState, dispatch: locationDispatch } = useLocation( 'Home' )
  const { state: actionsState, dispatch: actionsDispatch } = useActions( false )

  return (
    <AuthContext.Provider value={{ state: authState, dispatch: authDispatch }}>
      <LocationContext.Provider value={{ state: locationState, dispatch: locationDispatch }}>
        <ActionsContext.Provider value={{ state: actionsState, dispatch: actionsDispatch }}>
          {children}
        </ActionsContext.Provider>
      </LocationContext.Provider>
    </AuthContext.Provider>
  )
}

export default Providers
