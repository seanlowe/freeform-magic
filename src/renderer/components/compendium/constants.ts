import { AttributeOption } from '../../../types/characters.types'
import { AreaTypeOption, DamageTypeOption, DeliveryOption, DurationOption, SchoolOption, TargetOption } from '../../../types/spells.types'

export enum AvailableComponents {
  Area = 'area',
  Damage = 'damage',
  Delivery = 'delivery',
  DifficultyClass = 'difficultyClass',
  Duration = 'duration',
  DurationType = 'durationType',
  Level = 'level',
  Range = 'range',
  School = 'school',
  Target = 'target',
}

export const componentToComponentValuesMap: Map<AvailableComponents, any> =
 new Map<AvailableComponents, any>( [
   [ AvailableComponents.Area, Object.keys( AreaTypeOption ) ],
   [ AvailableComponents.DifficultyClass, Object.keys( AttributeOption ) ], 
   [ AvailableComponents.Damage, Object.keys( DamageTypeOption ) ],
   [ AvailableComponents.Delivery, Object.keys( DeliveryOption ) ],
   [ AvailableComponents.DurationType, Object.keys( DurationOption ) ],
   [ AvailableComponents.School, Object.keys( SchoolOption ) ],
   [ AvailableComponents.Target, Object.keys( TargetOption ) ],
   // If there's no specific options, set null or undefined
   [ AvailableComponents.Level, null ],
   [ AvailableComponents.Range, null ],
 ] )