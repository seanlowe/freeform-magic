import { useState } from 'react'

interface SearchSpellsFormProps {
  setSearchQuery: ( query: string ) => void;
  setIsFilteringSpells: ( isFiltering: boolean ) => void;
  filterSpells: ( query: string ) => void;
}

const SearchSpellsForm: React.FC<SearchSpellsFormProps> = ({
  setSearchQuery,
  setIsFilteringSpells,
  filterSpells
}) => {
  const [ tempSearchQuery, setTempSearchQuery ] = useState( '' )
  
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
            filterSpells( tempSearchQuery )
          }
        }}
        placeholder='Enter spell name'
        style={{ padding: '0.5rem', marginBottom: '1rem' }}
      />
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
            filterSpells( tempSearchQuery )
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
            return setIsFilteringSpells( false )
          }}
        >
        Back
        </button>
      </div>
    </div>
  )
}

export default SearchSpellsForm
