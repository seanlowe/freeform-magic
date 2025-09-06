import React, { useState } from 'react'

import { SelectBoxAction } from './selectbox'

interface SelectBoxProps {
  options: string[];
  onOptionClick: ( option: string, action: SelectBoxAction ) => void;
}

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
        padding: '8px',
        width: '300px',
        borderRadius: '6px',
        position: 'relative',
      }}
    >
      {/* Chips row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {selected.length > 0 && (
          <button
            onClick={handleReset}
            style={{
              border: '1px solid gray',
              borderRadius: '12px',
              padding: '2px 8px',
              cursor: 'pointer',
              background: '#f8f8f8',
            }}
          >
            Reset
          </button>
        )}

        {selected.map(( option ) => {
          return (
            <div
              key={option}
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid gray',
                borderRadius: '12px',
                padding: '2px 8px',
                background: '#e0e0e0',
              }}
            >
              {option}
              <span
                onClick={() => {
                  return handleRemove( option ) 
                }}
                style={{
                  marginLeft: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
              ×
              </span>
            </div>
          ) 
        })}
      </div>

      {/* AND/OR toggle chip */}
      {selected.length > 0 && (
        <div
          onClick={toggleMode}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            border: '1px solid gray',
            borderRadius: '12px',
            padding: '2px 10px',
            cursor: 'pointer',
            background: '#d9edf7',
            fontWeight: 'bold',
            userSelect: 'none',
          }}
        >
          {mode}
        </div>
      )}

      {/* Options list */}
      <div
        style={{
          marginTop: '12px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
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
                  border: '1px solid #ccc',
                  borderRadius: '12px',
                  padding: '4px 10px',
                  cursor: 'pointer',
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