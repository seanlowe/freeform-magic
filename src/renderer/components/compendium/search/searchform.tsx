/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useMemo, useState } from 'react'

import { AvailableComponent, AvailableComponents, ComponentEntry } from '../constants'
import SearchLogicSlider from './SearchLogicSlider'
import SelectBox2 from './selbox2'
import SelectBox, { SelectBoxAction } from './selectbox'
import { checkIfComponentIsInMapAndHasValue } from '../../spells/utilities'

interface SearchSpellsFormProps {
  selectedComponents: ComponentEntry[];
  setSelectedComponents: ( selectedComponents: ComponentEntry[] ) => void;
}

const SearchSpellsForm2: FC<SearchSpellsFormProps> = ({
  selectedComponents,
  setSelectedComponents,
}) => {

  // need a temp state to store components that we've selected that we want to fitler on
  // these will be string[], accepted values are AvailableComponents
  const [ selectedComponentTypes, setSelectedComponentTypes ] = useState<AvailableComponent[]>( [] )

  const updateQuery = ( query: string ) => {
    const updatedQueryComponent: ComponentEntry = { type: 'query', value: query }
    let currentComponents = selectedComponents

    // check if there is a query component in the selected components
    const queryComponent = selectedComponents.find(( component ) => {
      return component.type === 'query'
    })

    if ( queryComponent ) {
      // remove the query component from the selected components
      currentComponents = currentComponents.filter(( component ) => {
        return component.type !== 'query'
      })
    }

    // if we just deleted the query field, don't add in the query component
    if ( !query ) {
      setSelectedComponents( currentComponents )
      return
    }

    // add the updated query component back to the selected components
    setSelectedComponents( [
      ...currentComponents,
      updatedQueryComponent
    ] )
  }

  const handleTypeSelect = ( option: string, action: SelectBoxAction ) => {
    switch ( action ) {
    case SelectBoxAction.Add:
      setSelectedComponentTypes(( prev ) => {
        return [ ...prev, option as AvailableComponent ] 
      })
      break
    case SelectBoxAction.Remove:
      setSelectedComponentTypes(( prev ) => {
        return prev.filter(( c ) => {
          return c !== option 
        }) 
      })
      break
    case SelectBoxAction.Reset:
      setSelectedComponentTypes( [] )
      break
    }
  }

  const handleOptionSelect = ( option: string, action: SelectBoxAction, componentType: AvailableComponent ) => {
    switch ( action ) {
    case SelectBoxAction.Add:
      setSelectedComponentTypes(( prev ) => {
        return [ ...prev, option as AvailableComponent ] 
      })
      break
    case SelectBoxAction.Remove:
      setSelectedComponentTypes(( prev ) => {
        return prev.filter(( c ) => {
          return c !== option 
        }) 
      })
      break
    case SelectBoxAction.Reset:
      setSelectedComponentTypes( [] )
      break
    }
  }

  console.log( 'selectedComponents', selectedComponents )
  console.log( Object.values( AvailableComponents ))

  return (
    <div style={{ padding: '1rem' }}>
      <h3>Filter Spells</h3>
      {/* <SearchLogicSlider filterLogic={filterLogic} setFilterLogic={setFilterLogic} /> */}

      {/* search text box */}
      <input
        type='text'
        // value={tempSearchQuery}
        onChange={( e ) => {
          updateQuery( e.target.value )
        }}
        onKeyDown={( e ) => {
          if ( e.key === 'Enter' ) {
            console.log( selectedComponents )
          }
        }}
        placeholder='Enter search query. . .'
        style={{ padding: '0.5rem', marginBottom: '1rem' }}
      />

      {/* box that has all the other component types (not query) */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Filter by Components:</label>
        <SelectBox
          options={Object.values( [ ...AvailableComponents, 'query' ] )}
          onOptionClick={handleTypeSelect}
        />

        {selectedComponentTypes.map(( componentType ) => {
          switch ( componentType ) {
          case 'area':
          case 'damage':
          case 'delivery':
          case 'durationType':
          case 'element':
          case 'school':
          case 'target':
            return (
              <div
                key={componentType + `-${Math.random()}`}
                className='search-spells-form-component'
                style={{ marginBottom: '1rem' }}
              >
                <label>{componentType} Options:</label>
                <SelectBox2
                  options={checkIfComponentIsInMapAndHasValue( componentType.toLowerCase()) ?? []}
                  onOptionClick={( option, action ) => {
                    handleOptionSelect( option, action, componentType )
                  }}
                />
              </div>
            )
          case 'duration':
          case 'difficultyClass':
          case 'level':
          case 'range':
          case 'query':
          default:
            // console.log( 'MADE IT IN ELSE' )
            return <p> {componentType} </p>
          }
        })}

      </div>

      {/* buttons */}
      <div>

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
            console.log( 'back button clicked' )
            // setIsFilteringSpells( false )
          }}
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default SearchSpellsForm2
