import { Spell } from '@prisma/client'

import { SpellComponent, SpellForApp } from '../../../types/spells.types'

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
  const convertedSpell: SpellForApp = {
    ...selectedSpell,
    components: JSON.parse( JSON.stringify( selectedSpell.components )),
  }

  const renderComponents = ( components: SpellComponent[] ) => {
    if ( !components.length ) {
      return null
    }

    let toRender = `
      <section>
        <h3>Components</h3>
        <ul>
    `

    let componentCounter = 0
    toRender += components.map(( component ) => {
      let currentComponentToRender = null
      const { type, value } = component
      if ( !type || !value ) {
        return currentComponentToRender
      }

      currentComponentToRender = `<li key=${componentCounter}>`

      if ( Object.keys( value ).length ) {
        currentComponentToRender += `<strong>${type}: </strong>`
        for ( const [ key, val ] of Object.entries( value )) {
          currentComponentToRender += `${key}: ${val}, `
        }
      } else {
        currentComponentToRender += `<strong>${type}: </strong> ${value}`
      }
   
      componentCounter++
      currentComponentToRender += '</li>'

      return currentComponentToRender
    })

    return toRender + '</section></ul>'
  }

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
      { renderComponents( convertedSpell.components )}
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
