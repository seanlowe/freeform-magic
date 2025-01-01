import React, { ReactNode } from 'react'

import { AuthContext, initialAuthState } from './contexts/auth.context'
import { LocationContext } from './contexts/location.context'
import useAuth from './hooks/useAuth'
import useLocation from './hooks/useLocation'
import authReducer from './reducers/auth.reducer'

const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { state: authState, dispatch: authDispatch } = useAuth( authReducer, initialAuthState )
  const { state: locationState, dispatch: locationDispatch } = useLocation( 'Home' )

  return (
    <AuthContext.Provider value={{ state: authState, dispatch: authDispatch }}>
      <LocationContext.Provider value={{ state: locationState, dispatch: locationDispatch }}>
        {children}
      </LocationContext.Provider>
    </AuthContext.Provider>
  )
}

export default Providers
