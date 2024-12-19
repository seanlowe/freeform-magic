import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../utilities/contexts/auth.context'
import { Spell, Character, CharacterStatistics, CharacterProficiencies } from '../../types'
import CharacterSwitcher from './CharacterSwitcher'
import SpellDetails from './SpellDetails'
import SpellList from './SpellList'
import PageDropdown from './PageDropdown'
import CompendiumPage from './Compendium'
import CharactersPage from './CharactersPage'

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

const sampleStats: CharacterStatistics = {
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
}

const sampleProficiencies: CharacterProficiencies = {
  // Strength
  athletics: 10,

  // Dexterity
  acrobatics: 10,
  sleightOfHand: 10,
  stealth: 10,
  
  // Intelligence
  arcana: 10,
  history: 10,
  investigation: 10,
  nature: 10,
  religion: 10,
  
  // Wisdom
  animalHandling: 10,
  insight: 10,
  medicine: 10,
  perception: 10,
  survival: 10,
  
  // Charisma
  deception: 10,
  intimidation: 10,
  performance: 10,
  persuasion: 10,
}

const sampleCharacters: Character[] = [
  { id: 1, name: 'Aragorn', stats: sampleStats, proficiencies: sampleProficiencies },
  { id: 2, name: 'Gandalf', stats: sampleStats, proficiencies: sampleProficiencies },
  { id: 3, name: 'Legolas', stats: sampleStats, proficiencies: sampleProficiencies },
]

const HomePage = () => {
  const { state: { currentUser } } = useContext( AuthContext )
  const [ characters, setCharacters ] = useState<Character[]>( [] )
  const [ spells, setSpells ] = useState<Spell[]>( [] )
  const [ selectedCharacter, setSelectedCharacter ] = useState<number | null>( null )
  const [ selectedSpell, setSelectedSpell ] = useState<Spell | null>( null )
  const [ selectedPage, setSelectedPage ] = useState<string>( 'Home' )

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

    if ( !chosenSpell || chosenSpell === selectedSpell ) {
      return setSelectedSpell( null )
    }

    return setSelectedSpell( chosenSpell )
  }

  const onPageSelect = ( page: string ) => {
    setSelectedPage( page )
  }

  const renderSelectedPage = ( page: string ): React.ReactElement => {
    switch ( page ) {
    // home is the default page and handled in the JSX
    case 'Compendium':
      return <CompendiumPage spells={allSpells} setSpells={() => {
        console.log( 'setSpells' ) 
      }} />
    case 'Characters':
      return <CharactersPage />
    default:
      return <div>Page not found</div>
    }
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
              characters={sampleCharacters}
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
