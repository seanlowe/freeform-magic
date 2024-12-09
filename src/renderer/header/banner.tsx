import React, { useEffect, useState } from 'react'
import {
  headerStyle,
  titleStyle,
  userContainerStyle,
  usernameStyle,
  dropdownStyle,
  dropdownButtonStyle,
  placeholderStyle
} from './styles'

const Banner: React.FC = () => {
  const [ dropdownOpen, setDropdownOpen ] = useState( false )
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