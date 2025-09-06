import React, { useState, useRef, useEffect } from 'react'

interface SearchInputFieldProps {
  component: string;
  options: string[] | null;
  selectedValue: string;
  onChange: ( param: { [key: string]: string }) => void;
}

const SearchInputField: React.FC<SearchInputFieldProps> = ({
  component,
  options,
  selectedValue,
  onChange,
}) => {
  if ( !options ) {
    return <></>
  }

  const [ isOpen, setIsOpen ] = useState( false )
  const selectRef = useRef<HTMLDivElement>( null )

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleOutsideClick = ( event: MouseEvent ) => {
      if ( selectRef.current && !selectRef.current.contains( event.target as Node )) {
        setIsOpen( false )
      }
    }

    document.addEventListener( 'mousedown', handleOutsideClick )

    return () => {
      document.removeEventListener( 'mousedown', handleOutsideClick )
    }
  }, [] )

  const handleOptionClick = ( value: string ) => {
    // console.log({ [component]: value, component, value })
    onChange({ [component]: value }) // Notify parent component
    setIsOpen( false ) // Close dropdown
  }

  return (
    <div
      ref={selectRef}
      style={{
        position: 'relative',
        width: '200px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#fff',
      }}
    >
      {/* Selected Value */}
      <div
        style={{
          padding: '0.5rem',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onClick={() => {
          return setIsOpen( !isOpen )
        }}
      >
        {selectedValue || 'Select an option'}
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            margin: 0,
            padding: 0,
            listStyle: 'none',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#fff',
            zIndex: 10,
          }}
        >
          {options.map(( option ) => {
            return (
              <li
                key={option}
                style={{
                  padding: '0.5rem',
                  cursor: 'pointer',
                  backgroundColor: selectedValue === option ? '#f0f0f0' : '#fff',
                }}
                onClick={() => {
                  return handleOptionClick( option )
                }}
              >
                {option}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default SearchInputField
