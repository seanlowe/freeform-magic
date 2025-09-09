
import React, { FC, useState } from 'react'

export enum SelectBoxAction {
  Add,
  Remove,
  Reset,
}

interface SelectBoxProps {
  options: string[];
  onOptionClick: ( option: string, action: SelectBoxAction ) => void;
}


// component type box
const SelectBox: FC<SelectBoxProps> = ({ options, onOptionClick }) => {
  const [ available, setAvailable ] = useState<string[]>( options )
  const [ selected, setSelected ] = useState<string[]>( [] )

  const handleSelect = ( option: string ) => {
    setAvailable(( prev ) => {
      return prev.filter(( o ) => {
        return o !== option 
      }) 
    })

    setSelected(( prev ) => {
      return [ ...prev, option ] 
    })

    onOptionClick( option, SelectBoxAction.Add )
  }

  const handleRemove = ( option: string ) => {
    setSelected(( prev ) => {
      return prev.filter(( o ) => {
        return o !== option 
      }) 
    })

    setAvailable(( prev ) => {
      return [ ...prev, option ] 
    })

    onOptionClick( option, SelectBoxAction.Remove )
  }

  const handleReset = () => {
    setSelected( [] )
    setAvailable( options )
    onOptionClick( 'all', SelectBoxAction.Reset )
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
      {/* Selected Chips */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        marginBottom: selected.length > 0 ? '1rem' : '0',
      }}>
        {selected.length > 0 && (
          <button
            onClick={handleReset}
            style={{
              backgroundColor: 'lightgray',
              border: 'none',
              padding: '5px',
              cursor: 'pointer',
              borderRadius: '10px',
            }}
          >
            ⟲
          </button>
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
              <button
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
              ✕
              </button>
            </div>
          ) 
        })}
      </div>

      {/* Available Buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {available.map(( option ) => {
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

export default SelectBox