import React, { useState } from 'react'

const PageDropdown = ({
  selectedPage,
  setSelectedPage
}: {
  selectedPage: string,
  setSelectedPage: ( page: string ) => void
}) => {
  const pages = [
    { value: 'Home', label: 'Home' },
    { value: 'Compendium', label: 'Compendium' },
    { value: 'Characters', label: 'Characters' }
  ]

  const [ isOpen, setIsOpen ] = useState( false )

  const toggleDropdown = () => {
    return setIsOpen( !isOpen )
  }

  const handleSelection = ( value: string ) => {
    setSelectedPage( value )
    setIsOpen( false )
  }

  return (
    <div style={{
      display: 'flex',
      marginBottom: '1rem',
      position: 'relative',
      fontSize: 'x-large',
    }}>
      <div
        style={{
          fontWeight: '600',
          backgroundColor: 'transparent',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          borderRadius: '4px',
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
        onClick={toggleDropdown}
      >
        {selectedPage || 'Select a page'}
        <span style={{
          transform: isOpen ? 'rotate(180deg) scale(0.65)' : 'rotate(0) scale(0.65)',
          transition: 'transform 0.2s',
          marginLeft: '5rem',
        }}>
          ▼
        </span>
      </div>
      {isOpen && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            margin: 0,
            padding: '0.5rem 0',
            listStyle: 'none',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            zIndex: 1000,
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            fontSize: 'initial',
          }}
        >
          {pages.map(( page ) => {
            if ( page.value === selectedPage ) {
              return null
            }

            return (
              <li
                key={page.value}
                style={{
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  return handleSelection( page.value )
                }}
              >
                {page.label}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default PageDropdown
