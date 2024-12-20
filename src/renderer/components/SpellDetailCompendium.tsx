import { Spell } from '../../types'

const SpellDetailsCompendium = ({
  isFavorite,
  selectedSpell,
  setSelectedSpell,
  toggleFavorite
}: {
  isFavorite: ( spell: Spell ) => boolean,
  selectedSpell: Spell,
  setSelectedSpell: ( spell: Spell | null ) => void,
  toggleFavorite: ( spell: Spell ) => void
}) => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: '1rem 0',
        }}
      >
        <button
          onClick={() => {
            return setSelectedSpell( null ) 
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
        <h3 style={{ margin: 0 }}>{selectedSpell.name}</h3>
      </div>
      <p>{selectedSpell.description}</p>
      <button
        style={{
          padding: '0.5rem',
          backgroundColor: '#FF5733',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '1rem',
        }}
        onClick={() => {
          return toggleFavorite( selectedSpell ) 
        }}
      >
        {isFavorite( selectedSpell ) ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  )
}

export default SpellDetailsCompendium
