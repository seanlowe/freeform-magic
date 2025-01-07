/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

import { AvailableComponents } from './constants'
import SearchInputField from './SearchInputField'

interface SearchSpellsFormProps {
  setSearchQuery: ( query: string ) => void;
  setIsFilteringSpells: ( isFiltering: boolean ) => void;
  filterSpells: ( query: string, selectedComponents: string[], componentValues: string[] ) => void;
}

const SearchSpellsForm: React.FC<SearchSpellsFormProps> = ({
  setSearchQuery,
  setIsFilteringSpells,
  filterSpells
}) => {
  const [ tempSearchQuery, setTempSearchQuery ] = useState( '' )
  const [ componentValues, setComponentValues ] = useState<string[]>( [] )

  const [ selectedComponents, setSelectedComponents ] = useState<string[]>( [] )

  return (
    <div style={{ padding: '1rem' }}>
      <h3>Filter Spells</h3>
      <input
        type='text'
        value={tempSearchQuery}
        onChange={( e ) => {
          setTempSearchQuery( e.target.value )
        }}
        onKeyDown={( e ) => {
          if ( e.key === 'Enter' ) {
            setSearchQuery( tempSearchQuery )
            filterSpells( tempSearchQuery, selectedComponents, componentValues )
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
            console.log( 'MADE IT IN HERE' )
            return (
              <div
                key={component + `-${Math.random()}`}
                className='search-spells-form-component'
                style={{ marginBottom: '1rem' }}
              >
                <label>{component} Options:</label>
                <SearchInputField component={component} setComponentValues={setComponentValues} />
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
            filterSpells( tempSearchQuery, selectedComponents, componentValues )
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
