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
] as const

export type AvailableComponent = typeof AvailableComponents[number] | 'query'

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

export interface ComponentToValues {
  area: keyof typeof AreaTypeOption;
  difficultyClass: keyof typeof AttributeOption;
  damage: keyof typeof DamageTypeOption;
  delivery: keyof typeof DeliveryOption;
  durationType: keyof typeof DurationOption;
  element: keyof typeof ElementOption;
  school: keyof typeof SchoolOption;
  target: keyof typeof TargetOption;

  // These don’t have constrained sets
  level: string;
  range: string;
  duration: string;
}

export type ComponentEntry =
| { type: 'query'; value: string }
| {
    [K in keyof ComponentToValues]: {
      type: K;
      value: ComponentToValues[K];
    }
  }[keyof ComponentToValues];


// const a: ComponentEntry = {
//   type: "area",
//   value: "Cone", // ✅ must match AreaTypeOption keys
// };

// const b: ComponentEntry = {
//   type: "level",
//   value: "5", // ✅ just a string
// };

// const c: ComponentEntry = {
//   type: "query",
//   value: "fireball", // ✅ plain string
// };

// const d: ComponentEntry = {
//   type: "damage",
//   value: "Slashing", // ✅ must match DamageTypeOption keys
// };

// const bad: ComponentEntry = {
//   type: "damage",
//   value: "NotARealDamageType", // ❌ error
// };