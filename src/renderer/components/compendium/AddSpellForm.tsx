// import { Spell } from '@prisma/client'
import { useState } from 'react'

import { SpellForApp } from '../../../types/spells.types'

const AddSpellForm = ({
  onSpellAdd,
  closeForm
}: {
  onSpellAdd: ( spell: SpellForApp ) => void,
  closeForm: () => void
}) => {
  const [ newSpellName, setNewSpellName ] = useState( '' )
  const [ newSpellDescription, setNewSpellDescription ] = useState( '' )
  
  const handleAddSpell = () => {
    const newSpell: SpellForApp = {
      // id: Math.random(),
      name: newSpellName,
      description: newSpellDescription,
      components: [],
    }
    
    setNewSpellName( '' )
    setNewSpellDescription( '' )

    onSpellAdd( newSpell )
  }

  return (
    <div>
      <h3>Add New Spell</h3>
      <form onSubmit={( e ) => {
        e.preventDefault()
        handleAddSpell()
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'flex' }}>
            Spell Name:
            <input
              type='text'
              value={newSpellName}
              onChange={( e ) => {
                return setNewSpellName( e.target.value ) 
              }}
              style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'flex' }}>
              Description:
            <textarea
              value={newSpellDescription}
              onChange={( e ) => {
                return setNewSpellDescription( e.target.value ) 
              }}
              style={{
                marginLeft: '0.5rem',
                padding: '0.5rem',
                width: '100%',
                resize: 'none',
              }}
              rows={4}
              required
            />
          </label>
        </div>
        <div style={{
          marginBottom: '0.5rem',
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <button
            style={{
              padding: '0.5rem',
              backgroundColor: '#ccc',
              color: 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            onClick={() => {
              return closeForm() 
            }}
          >
            Cancel
          </button>
          <button
            type='submit'
            style={{
              padding: '0.5rem',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginLeft: '0.5rem',
            }}
          >
            Add Spell
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddSpellForm
