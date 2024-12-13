import React, { useContext, useState } from 'react'
import {
  headerStyle,
  titleStyle,
  userContainerStyle,
  usernameStyle,
  dropdownStyle,
  dropdownButtonStyle,
  placeholderStyle
} from './styles'
import { AuthContext } from '../utilities/contexts/auth.context'

const Banner: React.FC<{username: string}> = ({ username }) => {
  const [ dropdownOpen, setDropdownOpen ] = useState( false )
  const { dispatch } = useContext( AuthContext )

  const toggleDropdown = () => {
    return setDropdownOpen( !dropdownOpen ) 
  }

  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>D&D Spell Helper</h1>
      {username ? (
        <div style={userContainerStyle}>
          <span onClick={toggleDropdown} style={usernameStyle}>
            {username} ▾
          </span>
          {dropdownOpen && (
            <div style={dropdownStyle}>
              <button 
                onClick={() => {
                  return dispatch({ type: 'LOGOUT' }) 
                }}
                style={dropdownButtonStyle}
              >
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