import { FC, useState } from 'react'

import { iterateToNextValue } from '../utilities'
import SelectionChipLabel from './SelectionChipLabel'
import { EqualityOptions, LogicOptions } from '../constants'

interface LevelSelectorProps {
  value?: number;
  onChange?: ( val: number ) => void;
  min?: number;
  max?: number;
  step?: number;
}

const LevelSelector: FC<LevelSelectorProps> = ({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
}) => {
  const [ selected, setSelected ] = useState<string[]>( [] )
  const [ internal, setInternal ] = useState<number>( value ?? 0 )
  const [ logicOption, setLogicOption ] = useState<LogicOptions>( LogicOptions.AND )
  const [
    equalityOption,
    setEqualityOption
  ] = useState<EqualityOptions>( EqualityOptions.EQUAL_TO )

  const val = value ?? internal

  const update = ( next: number ) => {
    const clamped = Math.min( max, Math.max( min, next ))
    if ( value === undefined ) {
      setInternal( clamped )
    }
    onChange?.( clamped )
  }

  const toggleEqualityOption = () => {
    const values = Object.values( EqualityOptions )
    const currentIndex = iterateToNextValue( equalityOption, values )
    setEqualityOption( values[currentIndex] )
  }

  const toggleLogicOption = () => {
    const values = Object.values( LogicOptions )
    const currentIndex = iterateToNextValue( logicOption, values )
    setLogicOption( values[currentIndex] )
  }

  const handleSelect = (
    value: string,
    equalityOptionAtSelection: EqualityOptions = equalityOption,
    logicOptionAtSelection: LogicOptions = logicOption
  ) => {
    const newSelection = [ `${equalityOptionAtSelection}`, `${value}`, `${logicOptionAtSelection}` ]
    const newSelectionAsString = newSelection.join( ' ' )

    const indexOfDuplicateSequence = selected.join( ' ' ).indexOf( newSelectionAsString )
    if ( indexOfDuplicateSequence !== -1 ) {
      // we found it somewhere
      console.log( 'already selected' )
      return
    } else {
      // we didn't find it
      console.log( "didn't find it, adding" )
      setSelected(( prev ) => {
        return [ ...prev, ...newSelection ]
      })

      setEqualityOption( EqualityOptions.EQUAL_TO )
      setLogicOption( LogicOptions.AND )
    }
  }

  const handleRemove = ( startingIndex: number ) => {
    const tempSelected = [ ...selected ]
    tempSelected.splice( startingIndex, 3 )

    setSelected( tempSelected )
  }

  const handleReset = () => {
    setSelected( [] )
    setEqualityOption( EqualityOptions.EQUAL_TO )
    setLogicOption( LogicOptions.AND )
  }

  const renderChipLabel = ( entry: string, isEqualityOption: boolean, isLogicOption: boolean ) => {
    if ( isEqualityOption ) {
      return (
        <SelectionChipLabel
          currentValue={entry}
          possibleValues={Object.values( EqualityOptions )}
        />
      )
    } else if ( isLogicOption ) {
      return (
        <SelectionChipLabel
          currentValue={entry}
          possibleValues={Object.values( LogicOptions )}
        />
      )
    } else {
      return entry
    }
  }

  const renderSelectedChipsWithBorder = () => {
    const toRender = []
    for ( let i = 0; i < selected.length; i += 3 ) {
      const equalityOption = selected[i]
      const value          = selected[i + 1]
      const logicOption    = selected[i + 2]

      toRender.push(
        <div key={i} className='chip-sequence-wrapper'>
          <div className='chip-body'>
            {renderChipLabel( equalityOption, true, false )}
          </div>
          <div  className='chip-body'>
            {renderChipLabel( value, false, false )}
          </div>
          <div className='chip-body'>
            {renderChipLabel( logicOption, false, true )}
          </div>
          <span
            className='chip-x'
            onClick={() => {
              return handleRemove( i )
            }}
          >
            ×
          </span>
        </div>
      )
    }

    return toRender
  }

  return (
    <>
      {/* row of selected chips */}
      <div
        className='chips-wrapper'
        style={{ marginBottom: selected.length > 0 ? '1rem' : '0' }}
      >
        {selected.length > 0 && (
          <button
            className='chip-reset-button'
            onClick={handleReset}
          >
            ⟲
          </button>
        )}
        {renderSelectedChipsWithBorder()}
      </div>

      <div className='level-selector-row-wrapper'>
        <button
          className='level-selector-button'
          onClick={() => {
            return update( val - step )
          }}
        >
          -
        </button>

        <div className='level-selector-input-wrapper'>
          <input
            className='level-selector-input-field'
            type='number'
            value={val}
            onChange={( e ) => {
              return update( Number( e.target.value ))
            }}
            onKeyDown={( e ) => {
              if ( e.key === 'Enter' ) {
                handleSelect( e.currentTarget.value )
              }
            }}
          />
          <button
            className='level-selector-input-button'
            onClick={() => {
              handleSelect( val.toString())
            }}
          >
            ✔
          </button>
        </div>

        <button
          className='level-selector-button'
          onClick={() => {
            return update( val + step )
          }}
        >
          +
        </button>
      </div>

      <hr />

      <label> Level Selection Options: </label>
      <div className='options-wrapper'>
        <div
          className='options-button'
          onClick={toggleEqualityOption}
        >
          {equalityOption}
        </div>

        <div
          onClick={toggleLogicOption}
          className='options-button'
        >
          {logicOption}
        </div>
      </div>
    </>
  )
}

export default LevelSelector
