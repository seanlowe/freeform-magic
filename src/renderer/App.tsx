import React, { useEffect, useState } from 'react'
import Login from './registration/Login'
import Banner from './header/banner'

const App: React.FC = () => {
  const [ username, setUsername ] = useState<string | null>( '' )
  
  useEffect(() => {
    // Fetch the logged-in user's data from the database or local storage
    const fetchUser = async () => {
      const user = await window.api.auth.getCurrentUser()

      if ( user && user.length > 0 ) {
        setUsername( user[0].username )
      }
    }

    fetchUser()
  }, [] )

  return (
    <>
      <Banner username={username} />
      <div>
        <Login />
      </div>
    </>
  )
}

export default App

