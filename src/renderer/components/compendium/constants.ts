import { AttributeOption } from '../../../types/characters.types'
import {
  AreaTypeOption,
  DamageTypeOption,
  DeliveryOption,
  DurationOption,
  ElementOption,
  SchoolOption,
  TargetOption
} from '../../../types/spells.types'

export const AvailableComponents = [
  'area',
  'damage',
  'delivery',
  'difficultyClass',
  'duration',
  'durationType',
  'element',
  'level',
  'range',
  'school',
  'target',
]

export const componentToComponentValuesMap: Map<string, string[] | null> =
 new Map<string, string[] | null>( [
   [ 'area', Object.keys( AreaTypeOption ) ],
   [ 'difficultyclass', Object.keys( AttributeOption ) ],
   [ 'damage', Object.keys( DamageTypeOption ) ],
   [ 'delivery', Object.keys( DeliveryOption ) ],
   [ 'durationtype', Object.keys( DurationOption ) ],
   [ 'element', Object.keys( ElementOption ) ],
   [ 'school', Object.keys( SchoolOption ) ],
   [ 'target', Object.keys( TargetOption ) ],
   // If there's no specific options, set null or undefined
   [ 'level', null ],
   [ 'range', null ],
 ] )
