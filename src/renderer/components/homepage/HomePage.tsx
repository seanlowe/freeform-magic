import { useContext, useEffect, useState } from 'react'

import CharacterSwitcher from './CharacterSwitcher'
import PageDropdown from './PageDropdown'
import SpellDetails from './SpellDetails'
import SpellList from './SpellList'
import { Character } from '../../../types'
import { SpellForApp } from '../../../types/spells.types'
import { AuthContext } from '../../utilities/contexts/auth.context'
import CharactersPage from '../character/CharactersPage'
import CompendiumPage from '../compendium/Compendium'
import { convertSpellFromPrismaToApp } from '../spells/utilities'

const HomePage = ({
  location,
  onPageSelect
}: {
  location: string | null,
  onPageSelect: ( page: string ) => void
}) => {
  const { state: { currentUser } } = useContext( AuthContext )
  const [ characters, setCharacters ] = useState<Character[]>( [] )
  const [ spellsForCharacter, setSpellsForCharacter ] = useState<SpellForApp[]>( [] )
  const [ selectedCharacter, setSelectedCharacter ] = useState<Character | null>( null )
  const [ selectedSpell, setSelectedSpell ] = useState<SpellForApp | null>( null )

  const getCharacters = async ( username: string ) => {
    const characters =
      await window.api.database.characters.getCharactersByUser( username )

    setCharacters( characters )
    setSelectedCharacter( characters[0] )
  }

  const getSpellsForCharacter = async () => {
    const spells = selectedCharacter?.spells ?? []
    if ( !spells ) {
      setSpellsForCharacter( [] )
      return
    }

    const convertedSpells = spells.map( convertSpellFromPrismaToApp )
    setSpellsForCharacter( convertedSpells )
  }

  const onCharacterSwitch = ( character: Character ) => {
    setSelectedSpell( null )
    setSelectedCharacter( character )
    getSpellsForCharacter()
  }

  const onSpellSelect = ( spellName: string ) => {
    const chosenSpell = spellsForCharacter.find(( spell ) => {
      return spell.name.toLowerCase() === spellName.toLowerCase()
    })

    if ( !chosenSpell || chosenSpell === selectedSpell ) {
      return setSelectedSpell( null )
    }

    return setSelectedSpell( chosenSpell )
  }

  const renderSelectedPage = ( page: string ): React.ReactElement => {
    switch ( page ) {
    // home is the default page and handled in the JSX
    case 'Compendium':
      return <CompendiumPage />
    case 'Characters':
      return <CharactersPage characters={characters} />
    default:
      return <></>
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
    
    getSpellsForCharacter()
  }, [ selectedCharacter ] )

  if ( !currentUser || !location ) {
    return null
  }

  return (
    <>
      <PageDropdown selectedPage={location} setSelectedPage={onPageSelect} />
      { location === 'Home' && (
        <div style={{ display: 'flex', height: '100vh' }}>
          <SpellList
            spells={spellsForCharacter}
            selectedSpell={selectedSpell}
            onSelect={onSpellSelect}
          />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <CharacterSwitcher
              characters={characters}
              selectedCharacter={selectedCharacter}
              onSwitch={onCharacterSwitch}
            />
            <SpellDetails selectedSpell={selectedSpell} />
          </div>
        </div>
      )}
      { renderSelectedPage( location ) }
    </>
  )
}

export default HomePage
