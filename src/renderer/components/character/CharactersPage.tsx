import React, { useState } from 'react'

import CharacterSheet from './CharacterSheet'
import { Character } from '../../../types'

interface CharactersPageProps {
  characters: Character[];
}

interface CharactersPageProps2 extends CharactersPageProps {
  handleSelectCharacter: ( id: number ) => void;
}


const CharacterCarosel: React.FC<CharactersPageProps2> = ({
  characters, handleSelectCharacter
}) => {
  return <div className='characters-page'>
    {/* <h1>Characters</h1> */}
    <ul className='character-list'>
      {characters.map(({ id, name  }) => {
        return (
          <li
            key={id}
            className='character-item'
            onClick={() => {
              return handleSelectCharacter( id ) 
            }}
          >
            <h2>{name}</h2>
            {/* <p>{classAndLevel}</p> */}
          </li>
        ) 
      })}
    </ul>
  </div>
}

const CharactersPage: React.FC<CharactersPageProps> = ({ characters }) => {
  const [ isShowingCharacterSheet, setIsShowingCharacterSheet ] = useState( false )
  const [ selectedCharacter, setSelectedCharacter ] = useState<Character | null>( null )

  const handleSelectCharacter = ( id: number ) => {
    const newlySelectedCharacter = characters.find(( c ) => {
      return c.id === id
    })

    if ( !newlySelectedCharacter ) {
      return
    }

    setSelectedCharacter( newlySelectedCharacter )
    setIsShowingCharacterSheet( true )
  }

  const renderPage = () => {
    if ( isShowingCharacterSheet ) {
      if ( !selectedCharacter ) {
        return <div>No character selected</div>
      }

      return (
        <CharacterSheet
          character={selectedCharacter}
          closeModal={() => {
            return setIsShowingCharacterSheet( false ) 
          }}
        />
      )
    }

    return (
      <CharacterCarosel
        handleSelectCharacter={handleSelectCharacter}
        characters={characters}
      />
    )
  }

  return (
    <div>
      {renderPage()}
    </div>
  )
}

export default CharactersPage
