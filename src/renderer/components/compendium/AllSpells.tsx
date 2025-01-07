// import { Spell } from '@prisma/client'
import { SpellForApp } from '../../../types/spells.types'

const AllSpells = ({
  spells,
  setSelectedSpell,
  updateRecentlyViewed,
  setRecentlyViewed
}: {
  spells: SpellForApp[],
  setSelectedSpell: ( spell: SpellForApp | null ) => void,
  updateRecentlyViewed: ( newSpell: SpellForApp ) => SpellForApp[],
  setRecentlyViewed: ( spells: SpellForApp[] ) => void
}) => {
  return (
    <>
      <h3>All Spells</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {spells.map(( spell ) => {
          return (
            <div
              key={spell.name}
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
