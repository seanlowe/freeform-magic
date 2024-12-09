import React, { useState } from 'react'
import Login from './registration/Login'
import Header from './header/banner'

const App: React.FC = () => {
  const [ username, setUsername ] = useState<string | null>( '' )

  // useEffect(() => {
  //   // Fetch the logged-in user's data from the database or local storage
  //   const fetchUser = async () => {
  //     const user = await window.database.getUsers();
  //     if (user && user.length > 0) {
  //       setUsername(user[0].username);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  const handleLogin = ( username: string | null ) => {
    setUsername( username )
  }

  const handleLogout = () => {
    // Clear user data and reset username
    // window.database.clearUser();
    setUsername( null )
  }

  return (
    <>
      {/* <Header username={username} onLogout={handleLogout} /> */}
      <div>
        <Login onLogin={handleLogin} />
      </div>
    </>
  )
}

export default App

