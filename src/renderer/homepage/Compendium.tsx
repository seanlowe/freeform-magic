import React, { useState } from 'react'
import { Spell } from '../../types'

const CompendiumPage = ({
  spells,
  setSpells
}: {
  spells: Spell[],
  setSpells: ( spells: Spell[] ) => void
}) => {
  const [ searchQuery, setSearchQuery ] = useState( '' )
  const [ favorites, setFavorites ] = useState<Spell[]>( [] )
  const [ recentlyViewed, setRecentlyViewed ] = useState<Spell[]>( [] )
  const [ selectedSpell, setSelectedSpell ] = useState<Spell | null>( null )

  const addSpell = () => {
    // todo: add logic to add a new spell
    console.log( 'Add spell button clicked' )
  }

  const filterSpells = () => {
    // filter spells based on search query
    console.log( 'Filter button clicked' )
  }

  const updateRecentlyViewed = ( newSpell: Spell ): Spell[] => {
    const newRecentlyViewed = [
      newSpell,
      ...recentlyViewed.filter(( s ) => {
        return s.id !== newSpell.id 
      }),
    ].slice( 0, 5 )

    return newRecentlyViewed
  }

  const isFavorite = ( spell: Spell ) => {
    return favorites.some(( fav ) => {
      return fav.id === spell.id 
    }) 
  }

  const toggleFavorite = ( spell: Spell ) => {
    const spellIsFavorite = isFavorite( spell )

    let newFavorites: Spell[] = []
    if ( spellIsFavorite ) {
      newFavorites = favorites.filter(( fav ) => {
        return fav.id !== spell.id 
      })
    } else {
      newFavorites = [ ...favorites, spell ]
    }

    setFavorites( newFavorites )
  }

  return (
    <div style={{ padding: '1rem' }}>
      {/* Header Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          flexDirection: 'row-reverse',
          position: 'absolute',
          right: '0',
          top: '5rem',
          padding: '0 1rem',
        }}
      >
        <div>
          <button
            style={{
              marginRight: '0.5rem',
              padding: '0.5rem',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            onClick={filterSpells}
          >
            Filter / Search
          </button>
          <button
            style={{
              padding: '0.5rem',
              borderRadius: '50%',
              cursor: 'pointer',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              height: '30px',
              width: '30px',
            }}
            onClick={addSpell}
          >
            +
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          border: '1px solid grey',
          borderRadius: '8px',
          display: 'flex',
        }}
      >
        {/* Left Sidebar */}
        <div
          style={{
            borderRight: '1px solid grey',
            padding: '0 1rem',
            width: '30%',
          }}
        >
          {/* Favorites Section */}
          <section style={{ marginBottom: '1rem' }}>
            <h3>Favorites</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {favorites.length > 0 ? (
                favorites.map(( spell ) => {
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
                })
              ) : (
                <p>No favorite spells added yet.</p>
              )}
            </div>
          </section>

          {/* Recently Viewed Section */}
          <section style={{ marginBottom: '1rem' }}>
            <h3>Recently Viewed</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {recentlyViewed.length > 0 ? (
                recentlyViewed.map(( spell ) => {
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
                        return setSelectedSpell( spell ) 
                      }}
                    >
                      {spell.name}
                    </div>
                  ) 
                })
              ) : (
                <p>No spells viewed recently.</p>
              )}
            </div>
          </section>
        </div>

        {/* Main Section */}
        <section style={{ padding: '0 1rem', width: '70%' }}>
          {selectedSpell ? (
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
          ) : (
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
          )}
        </section>
      </div>
    </div>
  )
}

export default CompendiumPage
