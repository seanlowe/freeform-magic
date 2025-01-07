import { Spell } from '@prisma/client'

import { SpellForApp } from '../../../types/spells.types'

export const convertSpellFromPrismaToApp = ( selectedSpell: Spell ): SpellForApp => {
  return {
    ...selectedSpell,
    components: selectedSpell.components ? JSON.parse( selectedSpell.components ) : '',
  }
}
