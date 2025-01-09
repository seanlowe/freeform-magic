/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

import { AvailableComponents } from './constants'
import SearchInputField from './SearchInputField'
import SearchLogicSlider from './SearchLogicSlider'

interface SearchSpellsFormProps {
  setSearchQuery: ( query: string ) => void;
  setIsFilteringSpells: ( isFiltering: boolean ) => void;
  filterSpells: (
    query: string,
    selectedComponents: string[],
    selectedComponentValue: string,
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
  const [ selectedComponentValue, setSelectedComponentValue ] = useState<string>( '' )
  const [ filterLogic, setFilterLogic ] = useState<'AND' | 'OR'>( 'OR' )

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
            filterSpells( tempSearchQuery, selectedComponents, selectedComponentValue, filterLogic )
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
          { Object.values( AvailableComponents ).map(( component ) => {
            return (
              <option key={component.toString()} value={component}>{component}</option>
            )
          })}
        </select>

        {selectedComponents.map(( component ) => {
          switch ( component ) {
          case 'area':
          case 'damage':
          case 'delivery':
          case 'difficultyclass':
          case 'duration':
          case 'durationtype':
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
                  setSelectedComponentValue={setSelectedComponentValue}
                />
              </div>
            )
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
            filterSpells( tempSearchQuery, selectedComponents, selectedComponentValue, filterLogic )
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
