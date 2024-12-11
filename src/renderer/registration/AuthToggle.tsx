import React, { useState } from 'react'
import Register from './Register'
import Login from './Login'

const AuthToggle: React.FC = () => {
  const [ view, setView ] = useState<'login' | 'register'>( 'login' )

  return (
    <div>
      {view === 'login' ? <Login toggleView={setView} /> : <Register toggleView={setView} />}
    </div>
  )
}

export default AuthToggle
