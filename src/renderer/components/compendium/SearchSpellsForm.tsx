/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react'

import { AvailableComponents } from './constants'
import SearchInputField from './SearchInputField'
import SearchLogicSlider from './SearchLogicSlider'
import { checkIfComponentIsInMapAndHasValue } from '../spells/utilities'

interface SearchSpellsFormProps {
  setSearchQuery: ( query: string ) => void;
  setIsFilteringSpells: ( isFiltering: boolean ) => void;
  filterSpells: (
    query: string,
    selectedComponents: string[],
    selectedComponentValue: { [key: string]: string },
    filterLogic: 'AND' | 'OR'
  ) => void;
}

const SearchSpellsForm: React.FC<SearchSpellsFormProps> = ({
  setSearchQuery,
  setIsFilteringSpells,
  filterSpells
}) => {
  const [ tempSearchQuery, setTempSearchQuery ] = useState<string>( '' )
  const [ selectedComponents, setSelectedComponents ] = useState<string[]>( [] )
  const [ selectedComponentValues, setSelectedComponentValues ] = 
    useState<{ [key: string]: string }>({})
  const [ filterLogic, setFilterLogic ] = useState<'AND' | 'OR'>( 'OR' )

  const handleSelectChange = ( value: { [key: string]: string }) => {
    setSelectedComponentValues({ ...selectedComponentValues, ...value })
  }

  const renderedComponentTypeOptions = useMemo(() => {
    const availableComponents = Object.values( AvailableComponents )

    // remove 'level', 'range', and 'difficultyclass' from the list of available components
    const filteredAvailableComponents = availableComponents.filter(( component ) => {
      return component !== 'level' && component !== 'range' && component !== 'difficultyclass'
    })

    return filteredAvailableComponents.map(( component ) => {
      return (
        <option key={component.toString()} value={component}>{component}</option>
      )
    })
  }, [ AvailableComponents ] )

  return (
    <div style={{ padding: '1rem' }}>
      <h3>Filter Spells</h3>
      <SearchLogicSlider filterLogic={filterLogic} setFilterLogic={setFilterLogic} />
      <input
        type='text'
        value={tempSearchQuery}
        onChange={( e ) => {
          setTempSearchQuery( e.target.value )
        }}
        onKeyDown={( e ) => {
          if ( e.key === 'Enter' ) {
            setSearchQuery( tempSearchQuery )
            filterSpells(
              tempSearchQuery,
              selectedComponents,
              selectedComponentValues,
              filterLogic,
            )
          }
        }}
        placeholder='Enter spell name'
        style={{ padding: '0.5rem', marginBottom: '1rem' }}
      />
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Filter by Components:</label>
        <select
          multiple
          onChange={( e ) => {
            const selectedComponents = Array.from( e.target.selectedOptions, ( option ) => {
              return option.value
            })

            setSelectedComponents( selectedComponents )
          }}
          style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
        >
          {renderedComponentTypeOptions}
        </select>

        {selectedComponents.map(( component ) => {
          switch ( component ) {
          case 'area':
          case 'damage':
          case 'delivery':
          case 'duration':
          case 'durationtype':
          case 'element':
          case 'school':
          case 'target':
            return (
              <div
                key={component + `-${Math.random()}`}
                className='search-spells-form-component'
                style={{ marginBottom: '1rem' }}
              >
                <label>{component} Options:</label>
                <SearchInputField
                  component={component}
                  options={checkIfComponentIsInMapAndHasValue( component )}
                  selectedValue={selectedComponentValues[component]}
                  onChange={handleSelectChange}
                />
              </div>
            )
          case 'difficultyclass':
          case 'level':
          case 'range':
          default:
            console.log( 'MADE IT IN ELSE' )
            return null
          }
        })}
      </div>
      <div>
        <button
          style={{
            padding: '0.5rem 1rem',
            marginRight: '1rem',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={() => {
            setSearchQuery( tempSearchQuery )
            filterSpells(
              tempSearchQuery,
              selectedComponents,
              selectedComponentValues,
              filterLogic,
            )
            setSelectedComponentValues({})
          }}
        >
          Search
        </button>
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

export default SearchSpellsForm
