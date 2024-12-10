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

const Banner: React.FC<BannerProps> = ({ username }) => {
  const [ dropdownOpen, setDropdownOpen ] = useState( false )

  const un = username

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
              <button onClick={window.api.auth.logout} style={dropdownButtonStyle}>
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