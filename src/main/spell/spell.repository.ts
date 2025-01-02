import { PrismaClient, Spell } from '@prisma/client'

import { checkExistsOrThrow } from '../../db'
import { SpellForDB } from '../../types/spells.types'
import CharacterRepository from '../character/character.repository'
import ErrorObject from '../error/error.object'


class SpellRepository {
  private static db: PrismaClient = global.db

  static async getSpells(): Promise<Spell[]> {
    checkExistsOrThrow( this.db )

    const spells = await this.db.spell.findMany()

    return spells
  }

  static async getSpellsForCharacter( characterId: number ): Promise<Spell[]> {
    checkExistsOrThrow( this.db )

    const character = await CharacterRepository.getCharacter( characterId )

    if ( !character ) {
      throw new ErrorObject( 'character not found' )
    }

    const { spells } = character

    if ( !spells ) {
      return []
    }

    return spells
  }

  static async getSpell( id: number ): Promise<Spell | null> {
    checkExistsOrThrow( this.db )

    const spell = await this.db.spell.findFirst({
      where: {
        id,
      },
    })

    return spell
  }

  static async createSpell( spell: SpellForDB ): Promise<Spell> {
    checkExistsOrThrow( this.db )

    const newSpell = await this.db.spell.create({
      data: {
        name: spell.name,
        description: spell.description,
        components: JSON.stringify( spell.components ),
      }
    })

    return newSpell
  }

  static async deleteSpell( id: number ): Promise<void> {
    checkExistsOrThrow( this.db )

    await this.db.spell.delete({
      where: {
        id,
      },
    })
  }
}

export default SpellRepository
