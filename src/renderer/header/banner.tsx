import React, { useState } from 'react'
import { BannerProps } from '../../types'
import {
  headerStyle,
  titleStyle,
  userContainerStyle,
  usernameStyle,
  dropdownStyle,
  dropdownButtonStyle,
  placeholderStyle
} from './styles'
import UserRepository from '../../main/user/user.repository'

const Banner: React.FC<BannerProps> = async ({ username, onLogout }) => {
  const [ dropdownOpen, setDropdownOpen ] = useState( false )

  // const currentUser = window.api.database.invoke()
  const currentUser = await UserRepository.getUser( username ?? '' )
  const un = currentUser?.username ?? username

  const toggleDropdown = () => {
    return setDropdownOpen( !dropdownOpen ) 
  }

  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>D&D Spell Helper</h1>
      {un ? (
        <div style={userContainerStyle}>
          <span onClick={toggleDropdown} style={usernameStyle}>
            {un} ▾
          </span>
          {dropdownOpen && (
            <div style={dropdownStyle}>
              <button onClick={onLogout} style={dropdownButtonStyle}>
                Log Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <span style={placeholderStyle}>Not logged in</span>
      )}
    </header>
  )
}

export default Banner