import { Spell } from '@prisma/client'
import { useContext, useEffect, useState } from 'react'

import CharacterSwitcher from './CharacterSwitcher'
import PageDropdown from './PageDropdown'
import SpellDetails from './SpellDetails'
import SpellList from './SpellList'
import { Character } from '../../../types'
import { AuthContext } from '../../utilities/contexts/auth.context'
import CharactersPage from '../CharactersPage'
import CompendiumPage from '../compendium/Compendium'

const HomePage = ({
  location,
  onPageSelect
}: {
  location: string | null,
  onPageSelect: ( page: string ) => void
}) => {
  const { state: { currentUser } } = useContext( AuthContext )
  const [ characters, setCharacters ] = useState<Character[]>( [] )
  const [ spellsForCharacter, setSpellsForCharacter ] = useState<Spell[]>( [] )
  const [ selectedCharacter, setSelectedCharacter ] = useState<Character | null>( null )
  const [ selectedSpell, setSelectedSpell ] = useState<Spell | null>( null )

  const getCharacters = async ( username: string ) => {
    const characters =
      await window.api.database.characters.getCharactersByUser( username )

    console.log( characters )
    setCharacters( characters )
    setSelectedCharacter( characters[0] )
  }

  const getSpellsForCharacter = async () => {
    setSpellsForCharacter( selectedCharacter?.spells ?? [] )
  }

  const onCharacterSwitch = ( character: Character ) => {
    setSelectedSpell( null )
    setSelectedCharacter( character )
    getSpellsForCharacter()
  }

  const onSpellSelect = ( spellId: number ) => {
    const chosenSpell = spellsForCharacter.find(( spell ) => {
      return spell.id === spellId
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
