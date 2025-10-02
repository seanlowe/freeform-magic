import { FC, useState } from 'react'

import { AvailableComponent, AvailableComponents } from '../constants'
import ComponentTypeFilter from './ComponentTypeFilter'
import LevelSelector from './LevelSelector'
import SelectionBox, { SelectionBoxAction } from './SelectionBox'
import { checkIfComponentIsInMapAndHasValue } from '../../spells/utilities'

interface SearchSpellsFormProps {
  setIsFilteringSpells: ( isFiltering: boolean ) => void;
}

interface TempSavedOptions {
  [key: string]: string[]
}

const SearchSpellsForm: FC<SearchSpellsFormProps> = ({
  setIsFilteringSpells,
}) => {
  const [ query, setQuery ] = useState<string>( '' )

  console.log( 'query', query )

  const [ tempSavedOptions, setTempSavedOptions ] = useState<TempSavedOptions>({})
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

  const handleTypeSelect = ( option: string, action: SelectionBoxAction ) => {
    switch ( action ) {
    case SelectionBoxAction.Add:
      setSelectedComponentTypes(( prev ) => {
        return [ ...prev, option as AvailableComponent ] 
      })
      break
    case SelectionBoxAction.Remove: {
      handleOptionSelect( '', SelectionBoxAction.Reset, option as AvailableComponent )
      setSelectedComponentTypes(( prev ) => {
        return prev.filter(( c ) => {
          return c !== option 
        })
      })
      break
    }
    case SelectionBoxAction.Reset:
      setSelectedComponentTypes( [] )
      setTempSavedOptions({})
      break
    }
  }

  const addOptionToArray = ( array: string[], option: string ) => {
    if ( array.includes( option )) {
      return array
    }

    return [ ...array, option ]
  }

  const handleOptionSelect = (
    option: string,
    action: SelectionBoxAction,
    componentType: AvailableComponent,
  ) => {
    switch ( action ) {
    case SelectionBoxAction.Add: {
      const newArray = tempSavedOptions
      newArray[componentType] = !newArray[componentType]
        ? [ option ]
        : addOptionToArray( newArray[componentType], option )

      setTempSavedOptions( newArray )
      break
    }

    case SelectionBoxAction.Remove: {
      const newArray = tempSavedOptions
      newArray[componentType] = newArray[componentType]
        ? newArray[componentType].filter(( opt ) => {
          return opt !== option 
        })
        : []

      setTempSavedOptions( newArray )

      break
    }

    case SelectionBoxAction.Reset: {
      const newArray = tempSavedOptions
      newArray[componentType] = []

      setTempSavedOptions( newArray )
      break
    } 
    }
  }

  return (
    <>
      <div className='search-title'>
        <button
          className='search-title-back-button'
          onClick={() => {
            return setIsFilteringSpells( false )
          }}
        >
          ←
        </button>
        <h3>Filter Spells</h3>
      </div>

      <div className='search-component-type-select-wrapper'>
        <label className='search-component-type-select-label'>
          Filter by Components:
        </label>
        <SelectionBox
          className='component-type-select'
          options={Object.values( [ ...AvailableComponents, 'query' ] )}
          onOptionClick={handleTypeSelect}
        />

        <div className='search-selected-components-wrapper'>
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
                  useInnerWrapper={false}
                >
                  <SelectionBox
                    prepopulatedOptions={tempSavedOptions[componentType]}
                    options={checkIfComponentIsInMapAndHasValue( componentType.toLowerCase()) ?? []}
                    onOptionClick={( option, action ) => {
                      console.log( 'in here', { option, action })
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
                    className='search-query-input'
                  />
                </ComponentTypeFilter>
              )

            case 'level':
              return (
                <ComponentTypeFilter
                  visible={selectedComponentTypes.includes( componentType )}
                  componentType={componentType}
                  key={componentType + `-${Math.random()}`}
                >
                  <LevelSelector min={0} max={20}/>
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
                  <p> not implemented yet </p>
                </ComponentTypeFilter>
              )

            default:
              return null
            }
          })}
        </div>

      </div>

      {/* buttons */}
      <div className='search-form-buttons'>

        {/* search button */}
        <button
          className='search-form-button search-form-button-search'
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
          className='search-form-button'
          onClick={() => {
            setIsFilteringSpells( false )
          }}
        >
          Back
        </button>
      </div>
    </>
  )
}

export default SearchSpellsForm
