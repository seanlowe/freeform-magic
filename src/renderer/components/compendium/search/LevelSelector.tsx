import { FC, useState } from 'react'

interface LevelSelectorProps {
  value?: number;
  onChange?: ( val: number ) => void;
  min?: number;
  max?: number;
  step?: number;
}

enum EqualityOptions {
  EQUAL_TO = 'EQUAL TO',
  LESS_THAN = 'LESS THAN',
  GREATER_THAN = 'GREATER THAN',
  LESS_THAN_OR_EQUAL_TO = 'LESS THAN OR EQUAL TO',
  GREATER_THAN_OR_EQUAL_TO = 'GREATER THAN OR EQUAL TO',
}

enum LogicOptions {
  AND = 'AND',
  OR = 'OR',
}

// make this extend / inherit from an object that include value, label, and logicoption
interface LevelSelectionObject {
  equalityOption: EqualityOptions,
  logicOption: LogicOptions,
  value: number,
  label: string,
}

const LevelSelector: FC<LevelSelectorProps> = ({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
}) => {
  const [ equalityOption, setEqualityOption ] = useState<EqualityOptions>( EqualityOptions.EQUAL_TO )
  const [ logicOption, setLogicOption ] = useState<LogicOptions>( LogicOptions.AND )

  const [ selected, setSelected ] = useState<LevelSelectionObject[]>( [] )

  const [ internal, setInternal ] = useState<number>( value ?? 0 )
  const val = value ?? internal

  const update = ( next: number ) => {
    const clamped = Math.min( max, Math.max( min, next ))
    if ( value === undefined ) {
      setInternal( clamped ) 
    }
    onChange?.( clamped )
  }

  const toggleEqualityOption = () => {
    let values = Object.values( EqualityOptions )
    let currentIndex = values.indexOf( equalityOption )
    if (currentIndex == values.length - 1) {
      currentIndex = 0
    } else {
      currentIndex++
    }
    setEqualityOption( values[currentIndex] )
  }

  const toggleLogicOption = () => {
    setLogicOption(( prev ) => {
      return ( prev === LogicOptions.AND ? LogicOptions.OR : LogicOptions.AND ) 
    })
  }

  const handleSelect = (
    option: string,
    equalityOptionAtSelection: EqualityOptions = equalityOption,
    logicOptionAtSelection: LogicOptions = logicOption
  ) => {
    let label = `${equalityOptionAtSelection} ${option} ${logicOptionAtSelection}`

    let duplicateObjectExists = selected.find((selectedObject) => {
      return selectedObject.label === label
    })

    if (duplicateObjectExists) {
      console.log( 'already selected' )
      return
    }

    const newSelectionObject: LevelSelectionObject = {
      equalityOption: equalityOptionAtSelection,
      logicOption: logicOptionAtSelection,
      value: Number( option ),
      label: label,
    }

    setSelected(( prev ) => {
      return [ ...prev, newSelectionObject ]
    })

    setEqualityOption( EqualityOptions.EQUAL_TO )
    setLogicOption( LogicOptions.AND )
  }

  const handleRemove = ( optionLabel: string ) => {
    setSelected(( prev ) => {
      return prev.filter(( o ) => {
        return o.label !== optionLabel
      })
    })
  }

  const handleReset = () => {
    setSelected( [] )
    setEqualityOption( EqualityOptions.EQUAL_TO )
    setLogicOption( LogicOptions.AND )
  }


  // const buildQueryString = () -=> {}
  // const convertQueryStringToObject = () => {}
  
  
  // make "selected" an array of strings? like
  //     [ EqualityOptions.EQUAL_TO, 1, LogicOptions.AND, EqualityOptions.LESS_THAN, 2, LogicOptions.OR ]
  // then display all those strings as chips
  // and can remove them each individually and
  // click on the equality or logic options to
  // toggle them

  // need some way to make the in-progress work
  // in one component type not be reset when
  // selecting a new component to filter by.

  console.log( 'selected', selected )

  return (
    <>
      {/* row of selected chips */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        marginBottom: selected.length > 0 ? '1rem' : '0',
      }}>
        {selected.length > 0 && (
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
        )}

        {selected.map(( option, index ) => {
          const { label: rawLabel } = option
          let finalLabel = rawLabel

          if ( index === selected.length - 1 ) {
            console.log( 'last index', index )
            // strip off the last word
            finalLabel = rawLabel.split(' ').slice(0, -1).join(' ')
          }

          return (
            <div
              key={rawLabel}
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
              {finalLabel}
              <span
                onClick={() => {
                  return handleRemove( rawLabel )
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

      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        gap: '1rem',
        width: '100%',
        marginBottom: '1rem',
      }}>
        <button
          style={{
            border: '1px solid rgb(204, 204, 204)',
            borderRadius: '25px',
            height: '40px',
            width: '40px',
          }}
          onClick={() => {
            return update( val - step ) 
          }}
          >
          -
        </button>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          <input
            type='number'
            value={val}
            onChange={( e ) => {
              return update( Number( e.target.value )) 
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSelect( Number(e.currentTarget.value).toString() )
              }
            }}
            style={{
              width: '30px',
              textAlign: 'center',
              height: '30px',
              border: '1px solid rgb(204, 204, 204)',
              borderRadius: '6px',
            }}
          />
          <button
            onClick={() => {
              handleSelect( val.toString() )
            }}
            style={{
              border: '1px solid rgb(165 165 165)',
              backgroundColor: 'rgb(225, 225, 225)',
              borderRadius: '25px',
              height: '35px',
              width: '35px',
            }}
          >
            ✔
          </button>
        </div>

        <button
          style={{
            border: '1px solid rgb(204, 204, 204)',
            borderRadius: '25px',
            height: '40px',
            width: '40px',
          }}
          onClick={() => {
            return update( val + step ) 
          }}
          >
          +
        </button>
      </div>

      <hr />

      <label> Level Selection Options: </label>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '1rem',
        }}
      >
        <div
          onClick={toggleEqualityOption}
          style={{
            padding: '5px',
            cursor: 'pointer',
            borderRadius: '10px',

            // position: 'absolute',
            // top: '8px',
            // right: '8px',
            border: '1px solid gray',
            background: '#d9edf7',
            fontWeight: 'bold',
            userSelect: 'none',
          }}
        >
          {equalityOption}
        </div>

        <div
          onClick={toggleLogicOption}
          style={{
            padding: '5px',
            cursor: 'pointer',
            borderRadius: '10px',

            // position: 'absolute',
            // top: '8px',
            // right: '8px',
            border: '1px solid gray',
            background: '#d9edf7',
            fontWeight: 'bold',
            userSelect: 'none',
          }}
        >
          {logicOption}
        </div>
      </div>
    </>
  )
}

export default LevelSelector
