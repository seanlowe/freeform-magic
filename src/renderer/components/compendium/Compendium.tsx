import { useContext, useEffect, useState } from 'react'

import AddSpellForm from './add/AddSpellForm'
import AllSpells from './AllSpells'
import { ComponentEntry } from './constants'
import SearchChip from './search/SearchChip'
import SearchSpellsForm from './search/SearchSpellsForm'
import SpellDetailsCompendium from './SpellDetailCompendium'
import { SpellComponent, SpellForApp } from '../../../types/spells.types'
import { ActionsContext } from '../../utilities/contexts/actions.context'
import { convertSpellFromPrismaToApp } from '../spells/utilities'
import SearchSpellsForm2 from './search/searchform'

const CompendiumPage = () => {
  const { state: needsRefresh, dispatch: actionsDispatch } = useContext( ActionsContext )

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

  // const filterSpells = async (
  //   query: string,
  //   selectedComponents: ComponentEntry[],
  //   filterLogic: 'AND' | 'OR'
  // ) => {
  //   let newFilteredSpells: SpellForApp[] = []

  //   // spells can be filtered by components, query, or both
  //   // if filter logic is AND, all components must be present for a spell to be included
  //   // if filter logic is OR, at least one component must be present for a spell to be included

  //   filterByComponents( allSpells, selectedComponents, filterLogic )

  //   // await setFilteredSpells( newFilteredSpells )
  //   // await setIsFilteringSpells( false )
  // }

  const filterByComponents = ( listOfSpells: SpellForApp[], componentsToFilterBy: ComponentEntry[], filterLogic: 'AND' | 'OR' ) => {
    // loop over the spells in the list 
    return listOfSpells.filter(( spell ) => {
      const { components } = spell
      // if no components, don't keep spell in list
      if ( !components ) {
        console.log( 'returning false' )
        return false
      }

      // and check if they contain any (or all, depending on filter logic) of the components to filter by
      console.log( 'components', components )

      return false
    })
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
        <SearchSpellsForm2 setIsFilteringSpells={setIsFilteringSpells} />
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
          {/* render a SearchChip for each selected component */}
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

          {/* add spell button */}
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
