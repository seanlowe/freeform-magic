import React, { useContext } from 'react'
import Auth from './registration/Auth'
import Banner from './header/banner'
import HomePage from './homepage/HomePage'
import Providers from './utilities/providers'
import { AuthContext } from './utilities/contexts/auth.context'

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

