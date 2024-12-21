import { PrismaClient } from '@prisma/client'

import { checkExistsOrThrow } from '../../db'
import { Character } from '../../types'
import ErrorObject from '../error/error.object'
import UserRepository from '../user/user.repository'

class CharacterRepository {
  private static db: PrismaClient = global.db

  private static includeSelector = {
    include: {
      stats: true,
      proficiencies: true,
    }
  }

  // get all characters
  static async getCharacters(): Promise<Character[]> {
    checkExistsOrThrow( this.db )

    const characters = await this.db.character.findMany({
      ...this.includeSelector,
    })

    return characters
  }

  // get a single character
  static async getCharacter( id: number ): Promise<Character | null> {
    checkExistsOrThrow( this.db )

    const character = await this.db.character.findFirst({
      where: {
        id,
      },
      include: {
        stats: true,
        proficiencies: true,
      }
    })

    if ( !character ) {
      return null
    }

    return character
  }

  // get all characters for a user
  static async getCharactersByUser( username: string ): Promise<Character[]> {
    checkExistsOrThrow( this.db )
    
    const user = await UserRepository.getUser( username )
    if ( !user ) {
      throw new ErrorObject( 'user not found' )
    }

    const characters = await this.db.character.findMany({
      where: {
        userId: user.id,
      },
      ...this.includeSelector,
    })

    return characters
  }
}

export default CharacterRepository
