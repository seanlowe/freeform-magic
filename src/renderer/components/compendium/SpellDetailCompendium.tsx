import { SpellComponent, SpellForApp } from '../../../types/spells.types'

const SpellDetailsCompendium = ({
  isFavorite,
  selectedSpell,
  setSelectedSpell,
  toggleFavorite
}: {
  isFavorite: ( spell: SpellForApp ) => boolean,
  selectedSpell: SpellForApp,
  setSelectedSpell: ( spell: SpellForApp | null ) => void,
  toggleFavorite: ( spell: SpellForApp ) => void
}) => {
  const spellDescriptions = selectedSpell?.description.split( '|' )
  const renderComponents = ( components: SpellComponent[] ) => {
    if ( !components.length ) {
      return null
    }

    const toRenderArray = [ <h3>Components</h3> ]
    let componentCounter = 0

    const internalComponentsArray = components.map(( component ) => {
      let currentComponentToRender: React.ReactElement
      const { type, value } = component
      if ( !type || !value ) {
        return <></>
      }

      if ( typeof value === 'object' && Object.keys( value ).length ) {
        const componentElements: React.ReactElement[] = [ <strong>{type}: </strong> ]

        for ( const [ key, val ] of Object.entries( value )) {
          // console.log( key, val, value )
          componentElements.push(
            <>
              {key}: {val}
              <br />
            </>
          )
        }

        currentComponentToRender = <li key={componentCounter}>{...componentElements}</li>
      } else {
        currentComponentToRender = (
          <>
            <li key={componentCounter}>
              <strong>{type}: </strong> {value.toString()}
            </li>
          </>
        )
      }

      componentCounter++
      return currentComponentToRender
    })

    const unorderedList = <ul> {...internalComponentsArray} </ul>
    toRenderArray.push( unorderedList )
    const newComponent = <section> {...toRenderArray} </section>

    return (
      <>
        {newComponent}
      </>
    )
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
      {spellDescriptions?.map(( entry ) => {
        return <p> {entry} </p>
      })}
      { renderComponents( selectedSpell.components )}
      <button
        style={{
          padding: '0.5rem',
          backgroundColor: '#FF5733',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '1rem',
          marginBottom: '1rem',
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
