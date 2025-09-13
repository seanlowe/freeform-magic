import { FC, useState } from 'react'

import { AvailableComponent, AvailableComponents } from '../constants'
import ComponentTypeFilter from './ComponentTypeFilter'
import ComponentTypeFilterInnerWrapper from './ComponentTypeFilterInnerWrapper'
import SelectBox2 from './selbox2'
import SelectBox, { SelectBoxAction } from './selectbox'
import { checkIfComponentIsInMapAndHasValue } from '../../spells/utilities'
import LevelSelector from './LevelSelector'

interface SearchSpellsFormProps {
  setIsFilteringSpells: ( isFiltering: boolean ) => void;
}

interface TempSavedOptions {
  [key: string]: string[]
}

const SearchSpellsForm2: FC<SearchSpellsFormProps> = ({
  setIsFilteringSpells,
}) => {
  const [ query, setQuery ] = useState<string>( '' )

  const [ tempSavedOptions, setTempSavedOptions ] = useState<TempSavedOptions>( {} )
  const [ selectedComponentTypes, setSelectedComponentTypes ] = useState<AvailableComponent[]>( [] )

  // const updateQuery = useMemo(() => {
  //   const updatedQueryComponent: ComponentEntry = { type: 'query', value: query }
  //   let currentComponents = selectedComponents

  //   // check if there is a query component in the selected components
  //   const queryComponent = selectedComponents.find(( component ) => {
  //     return component.type === 'query'
  //   })

  //   if ( queryComponent ) {
  //     // remove the query component from the selected components
  //     currentComponents = currentComponents.filter(( component ) => {
  //       return component.type !== 'query'
  //     })
  //   }

  //   // if we just deleted the query field, don't add in the query component
  //   if ( !query ) {
  //     setSelectedComponents( currentComponents )
  //     return
  //   }

  //   // add the updated query component back to the selected components
  //   setSelectedComponents( [
  //     ...currentComponents,
  //     updatedQueryComponent
  //   ] )
  // }, [ query ] )

  // const updateQuery = ( query: string ) => {
  //   const updatedQueryComponent: ComponentEntry = { type: 'query', value: query }
  //   let currentComponents = selectedComponents
  //
  //   // check if there is a query component in the selected components
  //   const queryComponent = selectedComponents.find(( component ) => {
  //     return component.type === 'query'
  //   })
  //
  //   if ( queryComponent ) {
  //     // remove the query component from the selected components
  //     currentComponents = currentComponents.filter(( component ) => {
  //       return component.type !== 'query'
  //     })
  //   }
  //
  //   // if we just deleted the query field, don't add in the query component
  //   if ( !query ) {
  //     setSelectedComponents( currentComponents )
  //     return
  //   }
  //
  //   // add the updated query component back to the selected components
  //   setSelectedComponents( [
  //     ...currentComponents,
  //     updatedQueryComponent
  //   ] )
  // }

  const handleTypeSelect = ( option: string, action: SelectBoxAction ) => {
    switch ( action ) {
    case SelectBoxAction.Add:
      setSelectedComponentTypes(( prev ) => {
        return [ ...prev, option as AvailableComponent ] 
      })
      break
    case SelectBoxAction.Remove: {
      handleOptionSelect( '', SelectBoxAction.Reset, option as AvailableComponent )
      setSelectedComponentTypes(( prev ) => {
        return prev.filter(( c ) => {
          return c !== option 
        })
      })
      break
    }
    case SelectBoxAction.Reset:
      setSelectedComponentTypes( [] )
      setTempSavedOptions({})
      break
    }
  }

  const addOptionToArray = ( array: string[], option: string ) => {
    if ( array.includes( option ) ) {
      return array
    }

    return [ ...array, option ]
  }

  const handleOptionSelect = ( option: string, action: SelectBoxAction, componentType: AvailableComponent ) => {
    switch ( action ) {
    case SelectBoxAction.Add: {
      let newArray = tempSavedOptions
      newArray[componentType] = !newArray[componentType]
        ? [ option ]
        : addOptionToArray( newArray[componentType], option )

      setTempSavedOptions(newArray)
      break
    }

    case SelectBoxAction.Remove: {
      let newArray = tempSavedOptions
      newArray[componentType] = newArray[componentType]
        ? newArray[componentType].filter((opt) => opt !== option)
        : []

      setTempSavedOptions(newArray)

      break
    }

    case SelectBoxAction.Reset: {
      let newArray = tempSavedOptions
      newArray[componentType] = []

      setTempSavedOptions(newArray)
      break
    }}
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <button
          onClick={() => {
            return setIsFilteringSpells( false )
          }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginRight: '1rem',
            transform: 'scale(2.5)',
            position: 'relative',
            top: '-0.4rem',
          }}
        >
          ←
        </button>
        <h3>Filter Spells</h3>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Filter by Components:</label>
        <SelectBox
          options={Object.values( [ ...AvailableComponents, 'query' ] )}
          onOptionClick={handleTypeSelect}
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {Object.values( [ ...AvailableComponents, 'query' ] ).map(( componentType ) => {
            switch ( componentType ) {
            case 'area':
            case 'damage':
            case 'delivery':
            case 'durationType':
            case 'element':
            case 'school':
            case 'target':
              return (
                <ComponentTypeFilter
                  visible={selectedComponentTypes.includes( componentType )}
                  key={componentType + `-${Math.random()}`}
                  componentType={componentType}
                >
                  <SelectBox2
                    prepopulatedOptions={tempSavedOptions[componentType]}
                    options={checkIfComponentIsInMapAndHasValue( componentType.toLowerCase()) ?? []}
                    onOptionClick={( option, action ) => {
                      console.log("in here", { option, action })
                      handleOptionSelect( option, action, componentType )
                    }}
                  />
                </ComponentTypeFilter>
              )

            // search text box
            case 'query':
              return (
                <ComponentTypeFilter
                  visible={selectedComponentTypes.includes( componentType )}
                  componentType={componentType}
                  key={componentType + `-${Math.random()}`}
                >
                  <ComponentTypeFilterInnerWrapper>
                    <input
                      type='text'
                      onKeyDown={( e ) => {
                        if ( e.key === 'Enter' ) {
                          // updateQuery( e.currentTarget.value )
                          setQuery( e.currentTarget.value )
                          // updateQuery
                        }
                      }}
                      placeholder='Enter search query. . .'
                      style={{ padding: '0.5rem', marginBottom: '1rem', marginTop: '1rem', width: '90%' }}
                    />
                  </ComponentTypeFilterInnerWrapper>
                </ComponentTypeFilter>
              )

            case 'level':
              return (
                <ComponentTypeFilter
                  visible={selectedComponentTypes.includes( componentType )}
                  componentType={componentType}
                  key={componentType + `-${Math.random()}`}
                >
                  <ComponentTypeFilterInnerWrapper>
                    <LevelSelector min={0} max={20}/>
                  </ComponentTypeFilterInnerWrapper>
                </ComponentTypeFilter>
              )

            case 'duration':
            case 'difficultyClass':
            case 'range':
              return (
                <ComponentTypeFilter
                visible={selectedComponentTypes.includes( componentType )}
                componentType={componentType}
                key={componentType + `-${Math.random()}`}
                >
                  <ComponentTypeFilterInnerWrapper>
                    <p> not implemented yet </p>
                  </ComponentTypeFilterInnerWrapper>
                </ComponentTypeFilter>
              )

            default:
              return null
            }
          })}
        </div>

      </div>

      {/* buttons */}
      <div style={{ marginBottom: '1rem' }}>

        {/* search button */}
        <button
          style={{
            padding: '0.5rem 1rem',
            marginRight: '1rem',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={() => {
            console.log( 'search button clicked' )
            // setSearchQuery( tempSearchQuery )
            // filterSpells(
            //   selectedComponents,
            //   filterLogic,
            // )
            // setSelectedComponentValues({})
          }}
        >
          Search
        </button>

        {/* back button */}
        <button
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={() => {
            setIsFilteringSpells( false )
          }}
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default SearchSpellsForm2
