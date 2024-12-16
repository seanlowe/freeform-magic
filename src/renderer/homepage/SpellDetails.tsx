import { Spell } from '../../types'

const SpellDetails = ({ selectedSpell }: { selectedSpell: Spell | null }) => {
  return (
    <div style={{ flex: 1, padding: '16px' }}>
      {selectedSpell ? (
        <>
          <h3>{selectedSpell.name}</h3>
          <p>{selectedSpell.description}</p>
        </>
      ) : (
        <p>Select a spell to view its details.</p>
      )}
    </div>
  )
}

export default SpellDetails
