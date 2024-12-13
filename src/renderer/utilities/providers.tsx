import React, { ReactNode } from 'react'
import authReducer from './reducers/auth.reducer'
import useAuth from './hooks/useAuth'
import { AuthContext, initialAuthState } from './contexts/auth.context'

const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { state, dispatch } = useAuth( authReducer, initialAuthState )

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export default Providers
