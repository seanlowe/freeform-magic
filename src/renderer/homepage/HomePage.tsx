import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../utilities/contexts/auth.context'
import { Spell, Character } from '../../types'
import CharacterSwitcher from './CharacterSwitcher'
import SpellDetails from './SpellDetails'
import SpellList from './SpellList'

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

const sampleCharacters: Character[] = [
  { id: 1, name: 'Aragorn' },
  { id: 2, name: 'Gandalf' },
  { id: 3, name: 'Legolas' },
]

const HomePage = () => {
  const { state: { currentUser } } = useContext( AuthContext )
  const [ characters, setCharacters ] = useState<Character[]>( [] )
  const [ spells, setSpells ] = useState<Spell[]>( [] )
  const [ selectedCharacter, setSelectedCharacter ] = useState<number | null>( null )
  const [ selectedSpell, setSelectedSpell ] = useState<Spell | null>( null )

  const getCharacters = async () => {
    // const characters = await window.api.database.characters.
    //getCharactersByUser( currentUser.username )
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

    if ( !chosenSpell ) {
      return setSelectedSpell( null )
    }

    return setSelectedSpell( chosenSpell )
  }

  useEffect(() => {
    getCharacters()
  }, [] )

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
    <div style={{ display: 'flex', height: '100vh' }}>
      <SpellList
        spells={spells}
        selectedSpell={selectedSpell}
        onSelect={onSpellSelect}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <CharacterSwitcher
          characters={sampleCharacters}
          selectedCharacterId={selectedCharacter}
          onSwitch={onCharacterSwitch}
        />
        <SpellDetails selectedSpell={selectedSpell} />
      </div>
    </div>
  )
}

export default HomePage
