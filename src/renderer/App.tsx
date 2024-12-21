import React, { useContext } from 'react'

import HomePage from './components/homepage/HomePage'
import Banner from './header/banner'
import Auth from './registration/Auth'
import { AuthContext } from './utilities/contexts/auth.context'
import Providers from './utilities/providers'

const App: React.FC = () => {
  return (
    <Providers>
      <InnerAppWrapper />
    </Providers>
  )
}

const InnerAppWrapper: React.FC = () => {
  const { state: { currentUser } } = useContext( AuthContext )

  return (
    <>
      <Banner username={currentUser?.username ?? ''} />
      <div className='content'>
        <Auth />
        <HomePage />
      </div>
    </>
  )
}

export default App

