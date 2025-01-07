import { SpellForApp } from '../../../types/spells.types'

const SpellList = ({
  spells,
  selectedSpell,
  onSelect,
}: {
  spells: SpellForApp[],
  selectedSpell: SpellForApp | null,
  onSelect: ( spellName: string ) => void
}) => {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
      Spell List
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {spells.map(( spell ) => {
          return (
            <div
              key={spell.name}
              onClick={() => {
                return onSelect( spell.name )
              }}
              style={{
                padding: '16px',
                cursor: 'pointer',
                background: selectedSpell?.name === spell.name ? '#f0f0f0' : '#fff',
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
