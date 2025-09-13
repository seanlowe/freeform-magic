import { AttributeOption } from './characters.types'

/* ------------- */
/*   INTERFACES  */
/* ------------- */

export interface AreaOption {
  type: AreaTypeOption,
  size: number
}

interface DifficultyClassOption {
  parentAttribute: AttributeOption,
  success: string,
}

/**
 * don't use this type directly. Use either SpellForDB or SpellForApp
 */
export interface Spell {
  name: string
  description: string // is a single string with "|" separating paragraphs
}

/** 
 * use this type when inserting spells into the database
 */
export interface SpellForDB extends Spell {
  components: string // JSON string
}

/** 
 * use this type when using spells in the app
 */
export interface SpellForApp extends Spell {
  components: SpellComponent[]
}

/* ------------- */
/*     ENUMS     */
/* ------------- */

export enum AreaTypeOption {
  Line = 'line',
  Cone = 'cone',
  Sphere = 'sphere',
  Cylinder = 'cylinder',
  Cube = 'cube',
  
  // possible additions
  // Precise = 'precise',
  // AoE = 'area-of-effect',
}

export enum DamageTypeOption {
  Bludgeoning = 'bludgeoning',
  Force = 'force',
  Piercing = 'piercing',
  Slashing = 'slashing',
  Elemental = 'elemental',
}

export enum DeliveryOption {
  Range = 'range',
  Touch = 'touch',
  Stationary = 'stationary',
}

export enum DurationOption {
  Instant = 'instant',
  Ongoing = 'ongoing', // "concentration"
  Timed = 'timed',
}

export enum ElementOption {
  // D&D 5e options
  Fire = 'fire',
  Lightning = 'lightning',
  Thunder = 'thunder',
  Acid = 'acid',
  Cold = 'cold',
  Necrotic = 'necrotic',
  Poison = 'poison',
  Psychic = 'psychic',
  Radiant = 'radiant',

  // common options
  Earth = 'earth',
  Water = 'water',
  Air = 'air',

  // possible additions
  // Ice = 'ice',
  // Wind = 'wind',
  // Blood = 'blood',
  // Light = 'light',
  // Shadow = 'shadow',
  // Sound = 'sound',
  // Gravity = 'gravity',
  // Nature = 'nature',
  // Death = 'death',
  // Ethereal = 'ethereal',
}

// enum SavingThrowOption {
//   None = 'none',
//   Fortitude = 'fortitude',
//   Reflex = 'reflex',
//   Will = 'will',
// }

export enum SchoolOption {
  Abjuration = 'abjuration',
  Conjuration = 'conjuration',
  Divination = 'divination',
  Enchantment = 'enchantment',
  Evocation = 'evocation',
  Illusion = 'illusion',
  Necromancy = 'necromancy',
  Transmutation = 'transmutation',

  // possible additions
  // Alteration = 'alteration',
  // Restoration = 'restoration',
  // Jinx = 'jinx',
  // Mysticism = 'mysticism',
  // Primal = 'primal',
  // Hex = 'hex',
  // Curse = 'curse',
  // Charm = 'charm',
  // Countercurse = 'countercurse',
}

export enum TargetOption {
  Self = 'self',
  Person = 'person',
  Object = 'object',
  /*
   * Refers to a specific point or fixed coordinate on a map.
   * The spell or effect is anchored to that point and typically doesn’t extend beyond it.
   *
   * For example, a spell that creates a portal to a specific location on a map.
   * "Choose Location for effects tied to a specific point, like a trap or ward."
   */
  Location = 'location',
  /*
   * Refers to a region or volume that the spell covers.
   * May describe dynamic or extended effects (e.g., a blast radius, a cone, or a line).
   *
   * For example, a spell that creates a wall of fire.
   * "Choose Area for effects covering an extended space, like AoEs or cones."
   */
  Area = 'area',
}

/* ------------- */
/*     TYPES     */
/* ------------- */

export type DamageOption =
| { damageType: Omit<DamageTypeOption, DamageTypeOption.Elemental>; element: null }
| { damageType: DamageTypeOption.Elemental; element: ElementOption[] }

export type SpellComponent = 
| { type: 'area'; value: AreaOption }
| { type: 'damage'; value: DamageOption }
| { type: 'delivery'; value: DeliveryOption }
| { type: 'difficultyClass'; value: DifficultyClassOption }
| { type: 'duration'; value: number }
| { type: 'durationType'; value: DurationOption }
| { type: 'level'; value: number }
| { type: 'range'; value: number }
// | { type: 'savingThrow'; value: SavingThrowOption }
| { type: 'school'; value: SchoolOption }
| { type: 'target'; value: TargetOption }
