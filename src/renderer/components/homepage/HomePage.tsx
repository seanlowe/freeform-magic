import { useContext, useEffect, useState } from 'react'

import CharacterSwitcher from './CharacterSwitcher'
import PageDropdown from './PageDropdown'
import SpellDetails from './SpellDetails'
import SpellList from './SpellList'
import { Spell, Character } from '../../../types'
import { AuthContext } from '../../utilities/contexts/auth.context'
import CharactersPage from '../CharactersPage'
import CompendiumPage from '../compendium/Compendium'

// SAMPLE DATA STARTS HERE

// Record<character.id, spell[]>
const sampleSpells: Record<number, Spell[]> = {
  1: [
    {
      id: 1,
      name: 'Fireball',
      description: 'A bright streak flashes from your pointing finger to a point you choose...',
    },
    {
      id: 2,
      name: 'Lightning Bolt',
      description: 'A bright streak flashes from your pointing finger to a point you choose...',
    }
  ],
  2: [ 
    {
      id: 3,
      name: 'Cure Wounds',
      description: 'A creature you touch regains hit points equal to...',
    },
    {
      id: 4,
      name: 'Greater Cure Wounds',
      description: 'A stronger version of cure wounds.',
    },
    {
      id: 5,
      name: 'Antidote',
      description:
      'Dispel poison, disease, blindness, paralysis, and sickness on a creature you touch.',
    },
  ],
  3: [ 
    {
      id: 6,
      name: 'Mage Hand',
      description: 'A spectral, floating hand appears at a point you choose...',
    },
    {
      id: 7,
      name: 'Mage Foot',
      description: 'A spectral, floating foot appears at a point you choose...',
    },
    {
      id: 8,
      name: 'Mage Head',
      description: 'A spectral, floating head appears around eye level at a point you choose...',
    },
  ],
}

const allSpells: Spell[] = []
Object.keys( sampleSpells ).forEach(( spell ) => {
  return allSpells.push( ...sampleSpells[parseInt( spell )] )
})

// COMPONENT STARTS HERE

const HomePage = () => {
  const { state: { currentUser } } = useContext( AuthContext )
  const [ characters, setCharacters ] = useState<Character[]>( [] )
  const [ spells, setSpells ] = useState<Spell[]>( [] )
  const [ selectedCharacter, setSelectedCharacter ] = useState<number | null>( null )
  const [ selectedSpell, setSelectedSpell ] = useState<Spell | null>( null )
  const [ selectedPage, setSelectedPage ] = useState<string>( 'Home' )

  const getCharacters = async ( username: string ) => {
    const characters =
      await window.api.database.characters.getCharactersByUser( username )

    setCharacters( characters )
    setSelectedCharacter( characters[0].id )
  }

  const getSpellsForCharacter = async ( characterId: number ) => {
    // const spells = await window.api.database.spells.getSpellsByCharacter( characterId )
    setSpells( sampleSpells[characterId] )
  }

  const onCharacterSwitch = ( characterId: number ) => {
    setSelectedSpell( null )
    setSelectedCharacter( characterId )
  }

  const onSpellSelect = ( spellId: number ) => {
    const chosenSpell = spells.find(( spell ) => {
      return spell.id === spellId
    })

    if ( !chosenSpell || chosenSpell === selectedSpell ) {
      return setSelectedSpell( null )
    }

    return setSelectedSpell( chosenSpell )
  }

  const onPageSelect = ( page: string ) => {
    setSelectedPage( page )
  }

  const onAddSpell = ( newSpell: Spell ) => {
    // setSpells( [ ...spells, newSpell ] )
    allSpells.push( newSpell )
  }

  const renderSelectedPage = ( page: string ): React.ReactElement => {
    switch ( page ) {
    // home is the default page and handled in the JSX
    case 'Compendium':
      return <CompendiumPage spells={allSpells} onAddSpell={onAddSpell} />
    case 'Characters':
      return <CharactersPage />
    default:
      return <div>Page not found</div>
    }
  }

  useEffect(() => {
    if ( !currentUser ) {
      return
    }

    getCharacters( currentUser.username )
  }, [ currentUser ] )

  useEffect(() => {
    if ( !selectedCharacter ) {
      return
    }
    
    getSpellsForCharacter( selectedCharacter )
  }, [ selectedCharacter ] )

  if ( !currentUser ) {
    return null
  }

  return (
    <>
      <PageDropdown selectedPage={selectedPage} setSelectedPage={onPageSelect} />
      { selectedPage === 'Home' && (
        <div style={{ display: 'flex', height: '100vh' }}>
          <SpellList
            spells={spells}
            selectedSpell={selectedSpell}
            onSelect={onSpellSelect}
          />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <CharacterSwitcher
              characters={characters}
              selectedCharacterId={selectedCharacter}
              onSwitch={onCharacterSwitch}
            />
            <SpellDetails selectedSpell={selectedSpell} />
          </div>
        </div>
      )}
      { renderSelectedPage( selectedPage ) }
    </>
  )
}

export default HomePage
