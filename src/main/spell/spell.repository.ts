import { PrismaClient, Spell } from '@prisma/client'

import { checkExistsOrThrow } from '../../db'

class SpellRepository {
  private static db: PrismaClient = global.db

  static async getSpells(): Promise<Spell[]> {
    checkExistsOrThrow( this.db )

    const spells = await this.db.spell.findMany()

    return spells
  }
}

export default SpellRepository
