import React, { useContext, useState } from 'react'

import { ActionsContext } from '../../utilities/contexts/actions.context'
import { AuthContext } from '../../utilities/contexts/auth.context'

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
    <header className='headerStyle'>
      <h1 className='titleStyle'>D&D Spell Helper</h1>
      {username && (
        <div className='userContainerStyle'>
          <span onClick={toggleDropdown} className='usernameStyle'>
            {/* TODO - animate this arrow like on the page switcher */}
            {username} ▾
          </span>
          {dropdownOpen && (
            <div className='dropdownStyle'>
              { location === 'Compendium' && (
                <>
                  <button onClick={import5eSpells} className='dropdownButtonStyle'>
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
                className='dropdownButtonStyle'
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