import { PrismaClient } from '@prisma/client'

import { checkExistsOrThrow } from '../../db'
import { Spell } from '../../types'

class SpellRepository {
  private static db: PrismaClient = global.db

  static async getSpells(): Promise<Spell[]> {
    checkExistsOrThrow( this.db )

    const spells = await SpellRepository.getSpells()

    return spells
  }
}

export default SpellRepository
