import React, { useContext } from 'react'

import Banner from './components/header/banner'
import HomePage from './components/homepage/HomePage'
import Auth from './components/registration/Auth'
import { AuthContext } from './utilities/contexts/auth.context'
import { LocationContext } from './utilities/contexts/location.context'
import Providers from './utilities/providers'

import '../styles/global.scss'

const App: React.FC = () => {
  return (
    <Providers>
      <InnerAppWrapper />
    </Providers>
  )
}

const InnerAppWrapper: React.FC = () => {
  const { state: { currentUser } } = useContext( AuthContext )
  const { state: location, dispatch: locationDispatch } = useContext( LocationContext )

  return (
    <>
      <Banner
        location={location} 
        username={currentUser?.username ?? ''}
      />
      <div className='content'>
        <Auth />
        <HomePage location={location} onPageSelect={locationDispatch} />
      </div>
    </>
  )
}

export default App

