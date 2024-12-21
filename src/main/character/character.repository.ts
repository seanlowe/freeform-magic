import { SimpleElectronStore, checkStoreExistsOrThrow } from '../../db'
import { Character } from '../../types'
import ErrorObject from '../error/error.object'
import UserRepository from '../user/user.repository'

class CharacterRepository {
  private static store: SimpleElectronStore = global.store

  // get all characters
  static getCharacters(): Character[] {
    checkStoreExistsOrThrow( this.store )

    const characters = this.store.get( 'characters' )

    return characters
  }

  // get a single character
  static getCharacter( id: number ): Character | null {
    checkStoreExistsOrThrow( this.store )

    const characters = this.getCharacters()
    const character = characters.find(( character ) => {
      return character.id === id
    })

    if ( !character ) {
      return null
    }

    return character
  }

  // get all characters for a user
  static getCharactersByUser( username: string ): Character[] {
    checkStoreExistsOrThrow( this.store )
    
    const user = UserRepository.getUser( username )
    if ( !user ) {
      throw new ErrorObject( 'User not found' )
    }
    
    const { characterIds } = user
    const characters: Character[] = []

    characterIds.forEach(( id ) => {
      const character = this.getCharacter( id )
      if ( character ) {
        characters.push( character )
      }
    })

    return characters
  }
  
  // static createCharacter( character: Character ): Character {
  //   checkStoreExistsOrThrow( this.store )
  //
  //   const characters = this.getCharacters()
  //
  //   const [ first, last ] = character.name.split( ' ' )
  //   const newCharacter: Character = {
  //     id: Math.random(),
  //     name: character.name,
  //     stats: character.stats,
  //     proficiencies: character.proficiencies,
  //   }
  //
  //   characters[character.id] = newCharacter
  //
  //   this.store.set( 'characters', characters )
  //
  //   return newCharacter
  // }
  //
  // static deleteCharacter( id: number ): void {
  //   checkStoreExistsOrThrow( this.store )
  //
  //   const characters = this.getCharacters()
  //   delete characters[id]
  //
  //   this.store.set( 'characters', characters )
  // }
}

export default CharacterRepository
