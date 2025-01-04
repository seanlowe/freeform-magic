import React, { useContext, useState } from 'react'

import {
  headerStyle,
  titleStyle,
  userContainerStyle,
  usernameStyle,
  dropdownStyle,
  dropdownButtonStyle,
} from './styles'
import { ActionsContext } from '../utilities/contexts/actions.context'
import { AuthContext } from '../utilities/contexts/auth.context'

const Banner: React.FC<{username: string, location: string | null}> = ({ username, location }) => {
  const { dispatch: authDispatch } = useContext( AuthContext )
  const { dispatch: actionsDispatch } = useContext( ActionsContext )

  const [ dropdownOpen, setDropdownOpen ] = useState( false )

  const toggleDropdown = () => {
    return setDropdownOpen( !dropdownOpen )
  }

  const import5eSpells = async () => {
    toggleDropdown()
    await window.api.database.spells.importSpells()
    actionsDispatch( true )
  }

  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>D&D Spell Helper</h1>
      {username && (
        <div style={userContainerStyle}>
          <span onClick={toggleDropdown} style={usernameStyle}>
            {/* TODO - animate this arrow like on the page switcher */}
            {username} ▾
          </span>
          {dropdownOpen && (
            <div style={dropdownStyle}>
              { location === 'Compendium' && (
                <>
                  <button onClick={import5eSpells} style={dropdownButtonStyle}>
                    Import Spells from 5e
                  </button>
                  <hr />
                </>
              )}
              <button
                onClick={() => {
                  toggleDropdown()
                  authDispatch({ type: 'LOGOUT' })

                  return
                }}
                style={dropdownButtonStyle}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  )
}

export default Banner