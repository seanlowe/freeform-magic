import { AttributeOption } from './characters.types'
import { AreaOption, DamageTypeOption, ElementOption, SchoolOption } from './spells.types'

export interface AllSpellsResponse {
  index: string,
  name: string,
  level: number,
  url: string
}

export interface SpellDetailResponse {
  index: string,
  name: string,
  desc: string[],
  higher_level: string[],
  range: SpellRangeResponse,
  components: string[],
  material: string,
  ritual: boolean,
  duration: SpellDurationResponse,
  concentration: boolean,
  casting_time: string,
  level: number,
  attack_type: 'ranged' | 'melee'
  damage: {
    damage_type: SpellDamageResponse,
    damage_at_slot_level: {
      [key: number]: string
    }
  },
  dc: {
    dc_type: SpellDcTypeResponse,
    dc_success: 'none' | 'half' | 'other',
  },
  area_of_effect: AreaOption,
  school: SpellSchoolResponse,
  classes: GenericResponse[],
  subclasses: GenericResponse[],
  url: string,
}

export type SpellRangeResponse =
  | 'self'
  | 'sight'
  | 'special'
  | 'touch'
  | 'unlimited'
  | `${number} ${'feet' | 'miles'}`

export type SpellDurationResponse = 
  | 'instantaneous'
  | 'until dispelled'
  | 'up to x min/hour'
  | 'x min/hour/round/days'
  | 'special'
  | `${number} ${'min' | 'mins' | 'hour' | 'hours' | 'day' | 'days' | 'round' }`
  | `${'up to'} ${number} ${'min' | 'mins' | 'hour' | 'hours' | 'day' | 'days' | 'round' }`
    
interface SpellDamageResponse extends GenericResponse {
  index: DamageTypeOption | ElementOption,
}

interface SpellDcTypeResponse extends GenericResponse {
  index: AttributeOption,
}

interface SpellSchoolResponse extends GenericResponse {
  index: SchoolOption,
}

interface GenericResponse {
  index: string,
  name: string,
  url: string
}
