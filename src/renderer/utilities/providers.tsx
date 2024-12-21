import React, { ReactNode } from 'react'

import { AuthContext, initialAuthState } from './contexts/auth.context'
import useAuth from './hooks/useAuth'
import authReducer from './reducers/auth.reducer'

const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { state, dispatch } = useAuth( authReducer, initialAuthState )

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export default Providers
