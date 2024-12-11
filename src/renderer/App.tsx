import React from 'react'
import Auth from './registration/Auth'
import Banner from './header/banner'
import HomePage from './HomePage'
import Providers from './utilities/providers'

const App: React.FC = () => {
  return (
    <Providers>
      <Banner />
      <div className='content'>
        <Auth />
        <HomePage />
      </div>
    </Providers>
  )
}

export default App

