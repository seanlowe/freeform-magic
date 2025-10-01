import { useContext, useEffect, useState } from 'react'

import AddSpellForm from './add/AddSpellForm'
import AllSpells from './AllSpells'
import SearchSpellsForm from './search/searchform'
import SpellDetailsCompendium from './SpellDetailCompendium'
import { SpellForApp } from '../../../types/spells.types'
import { ActionsContext } from '../../utilities/contexts/actions.context'
import { useShortcut } from '../../utilities/hooks/useShortcut'
import { convertSpellFromPrismaToApp } from '../spells/utilities'

const CompendiumPage = () => {
  const { state: needsRefresh, dispatch: actionsDispatch } = useContext( ActionsContext )

  const [ favorites, setFavorites ] = useState<SpellForApp[]>( [] )
  const [ recentlyViewed, setRecentlyViewed ] = useState<SpellForApp[]>( [] )
  const [ allSpells, setAllSpells ] = useState<SpellForApp[]>( [] )
  const [ filteredSpells, setFilteredSpells ] = useState<SpellForApp[]>( [] )
  const [ selectedSpell, setSelectedSpell ] = useState<SpellForApp | null>( null )

  const [ isAddingSpell, setIsAddingSpell ] = useState( false )
  const [ isFilteringSpells, setIsFilteringSpells ] = useState( false )

  // helpful for debugging keys
  // useEffect(() => {
  //   const listener = (event: KeyboardEvent) => {
  //     console.log("Key Pressed: ", event.key);
  //   };
  //
  //   window.addEventListener("keydown", listener);
  //
  //   return () => window.removeEventListener("keydown", listener);
  // }, [])

  useShortcut( 'f', () => {
    setIsFilteringSpells( true )
  }, { ctrl: true, shift: true })

  useShortcut( 'Escape', () => {
    if ( isFilteringSpells ) {
      setIsFilteringSpells( false )
    }
  }, { ctrl: true })

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
    // don't persist the new spell to db yet
    // await window.api.database.spells.createSpell( newSpell )
    setAllSpells( [ ...allSpells, newSpell ] )
  }

  const handleAddSpell = ( newSpell: SpellForApp ) => {
    onAddSpell( newSpell )
    setIsAddingSpell( false )
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
        <SearchSpellsForm setIsFilteringSpells={setIsFilteringSpells} />
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
      <div className='compendium-header'>
        <div>
          {/* render a SearchChip for each selected component */}
          <button
            className='compendium-search-button'
            onClick={( e ) => {
              e.preventDefault()
              setIsFilteringSpells( true )
            }}
          >
            Filter / Search
          </button>

          {/* add spell button */}
          <button
            className='compendium-add-spell-button'
            onClick={() => {
              return setIsAddingSpell( true )
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className='compendium-main-content'>
        {/* Left Sidebar */}
        <div className='compendium-left-sidebar'>
          {/* Favorites Section */}
          <section>
            <h3>Favorites</h3>
            <div className='sidebar-list'>
              {favorites.length > 0 ? (
                favorites.map(( spell ) => {
                  return (
                    <div
                      key={spell.name}
                      className='sidebar-list-item'
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
          <section>
            <h3>Recently Viewed</h3>
            <div className='sidebar-list'>
              {recentlyViewed.length > 0 ? (
                recentlyViewed.map(( spell ) => {
                  return (
                    <div
                      key={spell.name}
                      className='sidebar-list-item'
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
        <section>
          { renderMainSection() }
        </section>
      </div>
    </div>
  )
}

export default CompendiumPage
