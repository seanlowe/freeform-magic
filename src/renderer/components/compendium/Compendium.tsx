import { useContext, useEffect, useState } from 'react'

import AddSpellForm from './AddSpellForm'
import AllSpells from './AllSpells'
import SearchChip from './SearchChip'
import SearchSpellsForm from './SearchSpellsForm'
import SpellDetailsCompendium from './SpellDetailCompendium'
import { SpellComponent, SpellForApp } from '../../../types/spells.types'
import { ActionsContext } from '../../utilities/contexts/actions.context'
import { convertSpellFromPrismaToApp } from '../spells/utilities'

const CompendiumPage = () => {
  const { state: needsRefresh, dispatch: actionsDispatch } = useContext( ActionsContext )

  const [ searchQuery, setSearchQuery ] = useState( '' )

  const [ favorites, setFavorites ] = useState<SpellForApp[]>( [] )
  const [ recentlyViewed, setRecentlyViewed ] = useState<SpellForApp[]>( [] )
  const [ allSpells, setAllSpells ] = useState<SpellForApp[]>( [] )
  const [ filteredSpells, setFilteredSpells ] = useState<SpellForApp[]>( [] )
  const [ selectedSpell, setSelectedSpell ] = useState<SpellForApp | null>( null )

  const [ isAddingSpell, setIsAddingSpell ] = useState( false )
  const [ isFilteringSpells, setIsFilteringSpells ] = useState( false )

  const getAllSpells = async () => {
    const spells = await window.api.database.spells.getSpells()
    const convertedSpells = spells.map( convertSpellFromPrismaToApp )

    setAllSpells( convertedSpells )
    setFilteredSpells( convertedSpells )
    actionsDispatch( false )
  }

  // run on first render
  useEffect(() => {
    getAllSpells()
  }, [] )

  useEffect(() => {
    // don't do anything if we just finished an action and marked this as false
    if ( !needsRefresh ) {
      return
    }

    getAllSpells()
  }, [ needsRefresh ] )

  const onAddSpell = ( newSpell: SpellForApp ) => {
    // await window.api.database.spells.createSpell( newSpell )
    setAllSpells( [ ...allSpells, newSpell ] )
    // allSpells.push( newSpell )
  }

  const handleAddSpell = ( newSpell: SpellForApp ) => {
    onAddSpell( newSpell )

    setIsAddingSpell( false )
  }

  const filterSpells = async (
    query: string,
    selectedComponents: string[],
    selectedComponentValue: string,
    filterLogic: 'AND' | 'OR'
  ) => {
    let newFilteredSpells: SpellForApp[] = []
    if ( query === '' && !selectedComponents ) {
      // we've "cleared" the search query so we need a refresh
      actionsDispatch( true )
    } else {
      // filter spells based on search query
      newFilteredSpells = allSpells.filter(( spell ) => {
        return spell.name.toLowerCase().includes( query.toLowerCase())
      })
    }

    // if we've selected components, add in any spells which have any of the selected components
    if ( selectedComponents.length > 0 ) {
      newFilteredSpells = (
        filterLogic === 'AND' ? filteredSpells : allSpells
      ).filter(( spell ) => {
        const { components } = spell
        if ( !components ) {
          console.log( 'returning false' )
          return false
        }

        // loop over each spell component and check if it matches any of the selected components
        return components.some(( spellComponent: SpellComponent ) => {
          const componentTypeIsSelected = selectedComponents.includes( spellComponent.type )
          if ( !componentTypeIsSelected ) {
            return false
          }

          switch ( typeof spellComponent.value ) {
          case 'number':
            return spellComponent.value === parseFloat( selectedComponentValue )
          case 'string':
            return spellComponent.value === selectedComponentValue
          case 'object': {
            // search the values of the keys of the object for the selected value
            return Object.keys( spellComponent.value ).some(( key ) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore fuck you
              return spellComponent.value[ key ] === selectedComponentValue.toLowerCase()
            })
          }
          default:
            console.error( 'get fucked' )
            break
          }
        })
      })
    }

    console.log({ filteredSpells })

    await setFilteredSpells( newFilteredSpells )
    await setIsFilteringSpells( false )
  }

  const removeFilter = () => {
    setSearchQuery( '' )
    actionsDispatch( true )
  }

  const updateRecentlyViewed = ( newSpell: SpellForApp ): SpellForApp[] => {
    const newRecentlyViewed = [
      newSpell,
      ...recentlyViewed.filter(( s ) => {
        return s.name !== newSpell.name
      }),
    ].slice( 0, 5 )

    return newRecentlyViewed
  }

  const isFavorite = ( spell: SpellForApp ) => {
    return favorites.some(( fav ) => {
      return fav.name === spell.name
    })
  }

  const toggleFavorite = ( spell: SpellForApp ) => {
    const spellIsFavorite = isFavorite( spell )

    let newFavorites: SpellForApp[] = []
    if ( spellIsFavorite ) {
      newFavorites = favorites.filter(( fav ) => {
        return fav.name !== spell.name
      })
    } else {
      newFavorites = [ ...favorites, spell ]
    }

    setFavorites( newFavorites )
  }

  const renderMainSection = () => {
    if ( isAddingSpell ) {
      return (
        <AddSpellForm
          onSpellAdd={handleAddSpell}
          closeForm={() => {
            return setIsAddingSpell( false )
          }}
        />
      )
    }

    if ( isFilteringSpells ) {
      return (
        <SearchSpellsForm
          setSearchQuery={setSearchQuery}
          setIsFilteringSpells={setIsFilteringSpells}
          filterSpells={filterSpells}
        />
      )
    }

    if ( selectedSpell ) {
      return (
        <SpellDetailsCompendium
          isFavorite={isFavorite}
          selectedSpell={selectedSpell}
          setSelectedSpell={setSelectedSpell}
          toggleFavorite={toggleFavorite}
        />
      )
    }

    return (
      <AllSpells
        spells={filteredSpells}
        setSelectedSpell={setSelectedSpell}
        updateRecentlyViewed={updateRecentlyViewed}
        setRecentlyViewed={setRecentlyViewed}
      />
    )
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
          {searchQuery && !isFilteringSpells && (
            <SearchChip text={searchQuery} onRemove={removeFilter} />
          )}
          <button
            style={{
              marginRight: '0.5rem',
              padding: '0.5rem',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            onClick={( e ) => {
              e.preventDefault()

              setIsFilteringSpells( true )
            }}
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
            onClick={() => {
              return setIsAddingSpell( true )
            }}
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
                })
              ) : (
                <p>No spells viewed recently.</p>
              )}
            </div>
          </section>
        </div>

        {/* Main Section */}
        <section style={{ padding: '0 1rem', width: '70%' }}>
          { renderMainSection() }
        </section>
      </div>
    </div>
  )
}

export default CompendiumPage
