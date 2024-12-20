import { Spell } from '../../../types'

const SpellList = ({
  spells,
  selectedSpell,
  onSelect,
}: {
  spells: Spell[],
  selectedSpell: Spell | null,
  onSelect: ( spellId: number ) => void
}) => {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
      Spell List
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {spells.map(( spell ) => {
          return (
            <div
              key={spell.id}
              onClick={() => {
                return onSelect( spell.id )
              }}
              style={{
                padding: '16px',
                cursor: 'pointer',
                background: selectedSpell?.id === spell.id ? '#f0f0f0' : '#fff',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              {spell.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SpellList
