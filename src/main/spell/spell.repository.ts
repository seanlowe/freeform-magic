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

  static async upsertSpell( spell: SpellForDB ): Promise<void> {
    checkExistsOrThrow( this.db )

    // because we don't always have IDs on the spells in the application, we cannot use
    // Prisma's upsert method. Instead, we'll check if the spell exists, and if it does,
    // update it. If it doesn't, create it.

    const existingSpell = await this.db.spell.findFirst({
      where: {
        name: spell.name,
      },
    })

    if ( !existingSpell ) {
      await this.db.spell.create({
        data: spell,
      })
    } else {
      await this.db.spell.update({
        where: {
          id: existingSpell.id,
        },
        data: spell,
      })
    }
  }
}

export default SpellRepository
