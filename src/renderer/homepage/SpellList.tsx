import { Spell } from '../../types'

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
    <div style={{ flex: 1, borderRight: '1px solid #ccc', overflowY: 'auto' }}>
      <h2>Spell List</h2>
      <ul>
        {spells.map(( spell ) => {
          return (
            <li
              key={spell.id}
              onClick={() => {
                return onSelect( spell.id )
              }}
              style={{
                padding: '8px',
                cursor: 'pointer',
                background: selectedSpell?.id === spell.id ? '#f0f0f0' : 'transparent',
              }}
            >
              {spell.name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SpellList
