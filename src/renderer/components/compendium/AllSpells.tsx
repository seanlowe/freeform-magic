import { Spell } from '../../../types'

const AllSpells = ({
  spells,
  setSelectedSpell,
  updateRecentlyViewed,
  setRecentlyViewed
}: {
  spells: Spell[],
  setSelectedSpell: ( spell: Spell | null ) => void,
  updateRecentlyViewed: ( newSpell: Spell ) => Spell[],
  setRecentlyViewed: ( spells: Spell[] ) => void
}) => {
  return (
    <>
      <h3>All Spells</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {spells.map(( spell ) => {
          return (
            <div
              key={spell.id}
              style={{
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={() => {
                const newRecentlyViewed = updateRecentlyViewed( spell )
  
                setRecentlyViewed( newRecentlyViewed )
                setSelectedSpell( spell )
              }}
            >
              {spell.name}
            </div>
          ) 
        })}
      </div>
    </>
  )
}

export default AllSpells
