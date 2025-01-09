import { Spell } from '@prisma/client'

import { SpellForApp } from '../../../types/spells.types'
import { componentToComponentValuesMap } from '../compendium/constants'

export const convertSpellFromPrismaToApp = ( selectedSpell: Spell ): SpellForApp => {
  return {
    ...selectedSpell,
    components: selectedSpell.components ? JSON.parse( selectedSpell.components ) : '',
  }
}


export const checkIfComponentIsInMapAndHasValue = ( component: string ): string[] | null => {
  if ( !component ) {
    return null
  }

  const hasComponentValues = componentToComponentValuesMap.has( component )
  if ( !hasComponentValues ) {
    return null
  }
  
  const componentValues = componentToComponentValuesMap.get( component )
  if ( !componentValues ) { 
    return null
  }

  return componentValues
}