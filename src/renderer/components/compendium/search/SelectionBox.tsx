import { FC, useState } from 'react'

import { LogicOptions } from '../constants'

export enum SelectionBoxAction {
  Add = 'Add',
  Remove = 'Remove',
  Reset = 'Reset',
}

interface SelectionBoxProps {
  prepopulatedOptions?: string[];
  options: string[];
  onOptionClick: ( option: string, action: SelectionBoxAction ) => void;
  className?: string;
}

const SelectionBox: FC<SelectionBoxProps> = ({
  prepopulatedOptions = [],
  options,
  onOptionClick,
  className,
}) => {
  const [ selected, setSelected ] = useState<string[]>( [ ...prepopulatedOptions ] )

  const [ mode, setMode ] = useState<LogicOptions>( LogicOptions.AND )

  const handleSelect = ( option: string ) => {
    setSelected(( prev ) => {
      return [ ...prev, option ] 
    })
    onOptionClick( option, SelectionBoxAction.Add )
  }

  const handleRemove = ( option: string ) => {
    setSelected(( prev ) => {
      return prev.filter(( o ) => {
        return o !== option 
      })
    })
    onOptionClick( option, SelectionBoxAction.Remove )
  }

  const handleReset = () => {
    setSelected( [] )
    setMode( LogicOptions.AND )
    onOptionClick( '', SelectionBoxAction.Reset )
  }

  const toggleMode = () => {
    setMode(( prev ) => {
      return ( prev === LogicOptions.AND ) ? LogicOptions.OR : LogicOptions.AND
    })
  }

  const wrapperClassName = className ? className : 'select-box-wrapper'

  return (
    <div className={wrapperClassName}>
      {/* row of selected chips */}
      <div
        className='selection-box-selected-chips-wrapper'
        style={{
          marginBottom: selected.length > 0 ? '1rem' : '0',
          paddingRight: mode === 'AND' ? '47px' : '37px',
        }}
      >
        {selected.length > 0 && (
          <>
            <button
              onClick={handleReset}
              className='selection-box-reset-chips-button'
            >
              ⟲
            </button>

            {/* AND/OR toggle chip */}
            <div
              className='selection-box-and-or-toggle-button'
              onClick={toggleMode}
            >
              {mode}
            </div>
          </>
        )}

        {selected.map(( option ) => {
          return (
            <div
              className='selection-box-selected-chip-body'
              key={option}
            >
              {option}
              <span
                className='selection-box-selected-chip-x'
                onClick={() => {
                  return handleRemove( option ) 
                }}
              >
              ×
              </span>
            </div>
          ) 
        })}
      </div>

      {/* list of available options */}
      <div className='selection-box-available-options-list'>
        {options
          .filter(( o ) => {
            return !selected.includes( o ) 
          })
          .map(( option ) => {
            return (
              <button
                className='selection-box-available-options-list-item'
                key={option}
                onClick={() => {
                  return handleSelect( option ) 
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

export default SelectionBox
