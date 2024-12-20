import { Spell } from '../../../types'

const SpellDetails = ({ selectedSpell }: { selectedSpell: Spell | null }) => {
  return (
    <div style={{
      padding: '16px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      background: '#fff',
    }}>
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
