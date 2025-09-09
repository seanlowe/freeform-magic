import React, { useState } from 'react'

import { SelectBoxAction } from './selectbox'

interface SelectBoxProps {
  options: string[];
  onOptionClick: ( option: string, action: SelectBoxAction ) => void;
}


// component options box
const SelectBox2: React.FC<SelectBoxProps> = ({ options }) => {
  const [ selected, setSelected ] = useState<string[]>( [] )
  const [ mode, setMode ] = useState<'AND' | 'OR'>( 'AND' )

  const handleSelect = ( option: string ) => {
    setSelected(( prev ) => {
      return [ ...prev, option ] 
    })
  }

  const handleRemove = ( option: string ) => {
    setSelected(( prev ) => {
      return prev.filter(( o ) => {
        return o !== option 
      }) 
    })
  }

  const handleReset = () => {
    setSelected( [] )
    setMode( 'AND' )
  }

  const toggleMode = () => {
    setMode(( prev ) => {
      return ( prev === 'AND' ? 'OR' : 'AND' ) 
    })
  }

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '1rem',
        width: '300px',
        borderRadius: '8px',
        position: 'relative',
      }}
    >
      {/* row of selected chips */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        marginBottom: selected.length > 0 ? '1rem' : '0',
        // marginTop: selected.length > 0 ? '8px' : '0px',
        paddingRight: mode === 'AND' ? '47px' : '37px',
      }}>
        {selected.length > 0 && (
          <>
            <button
              onClick={handleReset}
              style={{
                background: 'lightgray',
                border: 'none',
                padding: '5px',
                cursor: 'pointer',
                borderRadius: '10px',
              }}
            >
              ⟲
            </button>

            {/* AND/OR toggle chip */}
            <div
              onClick={toggleMode}
              style={{
                padding: '5px',
                cursor: 'pointer',
                borderRadius: '10px',

                position: 'absolute',
                top: '8px',
                right: '8px',
                border: '1px solid gray',
                background: '#d9edf7',
                fontWeight: 'bold',
                userSelect: 'none',
              }}
            >
              {mode}
            </div>
          </>
        )}

        {selected.map(( option ) => {
          return (
            <div
              key={option}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#e0f0ff',
                color: '#004080',
                padding: '0.25rem 0.5rem',
                borderRadius: '10px',
                fontSize: '0.9rem'
              }}
            >
              {option}
              <span
                onClick={() => {
                  return handleRemove( option ) 
                }}
                style={{
                  marginLeft: '0.5rem',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  color: '#004080'
                }}
              >
              ×
              </span>
            </div>
          ) 
        })}
      </div>

      {/* list of available options */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          // marginTop: '12px',
        }}
      >
        {options
          .filter(( o ) => {
            return !selected.includes( o ) 
          })
          .map(( option ) => {
            return (
              <button
                key={option}
                onClick={() => {
                  return handleSelect( option ) 
                }}
                style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  cursor: 'pointer',
                  background: '#f5f5f5'
                }}
              >
                {option}
              </button>
            ) 
          })}
      </div>
    </div>
  )
}

export default SelectBox2