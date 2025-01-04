import SpellRepository from './spell.repository'
import {
  AllSpellsResponse,
  SpellDetailResponse,
  SpellRangeResponse
} from '../../types/api.types'
import {
  AreaTypeOption,
  DamageOption,
  DamageTypeOption,
  DeliveryOption,
  DurationOption,
  ElementOption,
  SpellComponent,
  SpellForApp,
  SpellForDB,
  TargetOption
} from '../../types/spells.types'

const BASE_URL = 'https://www.dnd5eapi.co'

type ImportAll5eSpellsResponse = {
  count: number,
  results: AllSpellsResponse[]
}

export async function importAll5eSpells() {
  const importedSpells: SpellDetailResponse[] = await import5eSpells()

  const spells: SpellForApp[] = convert5eSpellsToAppSpells( importedSpells )

  const spellsToSave: SpellForDB[] = spells.map(( spell ) => {
    return {
      name: spell.name,
      description: spell.description,
      components: JSON.stringify( spell.components ),
    }
  })

  for ( const spell of spellsToSave ) {
    await SpellRepository.upsertSpell( spell )
  }

  return spells
}

function convert5eSpellsToAppSpells( importedSpells: SpellDetailResponse[] ): SpellForApp[] {
  const spells: SpellForApp[] = importedSpells.map(( spell ) => {
    return {
      name: spell.name,
      description: spell.desc.join( ' ' ),
      components: buildSpellComponents( spell ),
    }
  })

  return spells
}

function mapResponseToDamageOption( response: SpellDetailResponse ): DamageOption | null {
  const elementOptions = Object.values( ElementOption ) as string[]
  const damageTypeOptions = Object.values( DamageTypeOption ) as string[]

  const damageType = response.damage.damage_type?.index as string ?? null

  if ( !damageType ) {
    return null
  }

  if ( damageTypeOptions.includes( damageType )) {
    if ( damageType === DamageTypeOption.Elemental ) {
      // if it's 'elemental', map the elements based on additional context
      throw new Error( 'Elemental damage requires mapping to specific elements.' )
    } else {
      // non-elemental damage types
      return {
        damageType: damageType as Exclude<DamageTypeOption, DamageTypeOption.Elemental>,
        element: null,
      }
    }
  } else if ( elementOptions.includes( damageType )) {
    // map elemental types as "Elemental" damage type
    return {
      damageType: DamageTypeOption.Elemental,
      element: [ damageType as ElementOption ], // wrap in array as the type requires
    }
  } else {
    throw new Error( `Invalid damage type: ${damageType}` )
  }
}

function parseRangeOption( range: SpellRangeResponse ): number {
  const match = range.match( /^(\d+)\s+(feet|miles|meters|kilometers)$/ )
  if ( !match ) {
    return -1 // not a valid formatted range
  }

  const [ , distance, unit ] = match
  let distanceInt = parseInt( distance, 10 )

  // convert everything to feet
  if ( unit !== 'feet' ) {
    switch ( unit ) {
    // case 'meters':
    //   distanceInt = distanceInt * 3.28084
    //   break
    // case 'kilometers':
    //   distanceInt = distanceInt * 3280.84
    //   break
    case 'miles':
      distanceInt = distanceInt * 5280
      break
    default:
      distanceInt = -1
    }
  }

  return distanceInt
}

function convertRangeToSpellComponents(
  response: SpellDetailResponse
): SpellComponent[] {
  const components: SpellComponent[] = []

  let deliveryOption: DeliveryOption = DeliveryOption.Range
  let targetOption: TargetOption | null = null
  let range = 60

  switch ( response.range ) {
  case 'self':
    deliveryOption = DeliveryOption.Touch
    targetOption = TargetOption.Self
    range = 0
    break
  case 'touch':
    deliveryOption = DeliveryOption.Touch
    range = 0
    break
  case 'special':
    deliveryOption = DeliveryOption.Range
    range = Infinity
    break
  case 'unlimited':
    deliveryOption = DeliveryOption.Range
    range = Infinity
    break
  case 'sight':
    deliveryOption = DeliveryOption.Range
    // arbitrary number. People can see 300 feet, right?
    range = 300
    break
  default:
    // it's in the form of "x feet" or "x miles"
    range = parseRangeOption( response.range )
    break
  }

  components.push({ type: 'delivery', value: deliveryOption })
  components.push({ type: 'range', value: range })

  if ( targetOption ) {
    components.push({ type: 'target', value: targetOption })
  }

  return components
}

function convertDurationToSpellComponents( spell: SpellDetailResponse ): SpellComponent[] {
  const components: SpellComponent[] = []
  const { duration, concentration } = spell
  const spellDuration = duration.toLowerCase()
  // arbitrarily set to 10 minutes
  const durationComponent: SpellComponent = { type: 'duration', value: 10 }
  const durationTypeComponent: SpellComponent = {
    type: 'durationType',
    value: DurationOption.Timed
  }

  if ( [ 'instantaneous', 'until dispelled', 'special' ].includes( spellDuration )) {
    switch ( spellDuration ) {
    case 'instantaneous':
      durationTypeComponent.value = DurationOption.Instant
      break
    case 'until dispelled':
    case 'special':
      durationTypeComponent.value = DurationOption.Ongoing
      break
    }

    components.push( durationComponent, durationTypeComponent )

    return components
  }

  // Parse duration for numeric and "up to" cases
  const match = duration.match( /^(up to )?(\d+)\s+(min|mins|hour|hours|day|days|round|rounds)$/ )
  if ( !match ) {
    return []
  }

  const [ , , amount, unit ] = match
  // convert everything to minutes
  let timeAmount: number = parseInt( amount )
  switch ( unit ) {
  case 'min':
  case 'mins':
    // already in minutes
    break
  case 'hour':
  case 'hours':
    timeAmount *= 60
    break
  case 'day':
  case 'days':
    timeAmount *= 60 * 24
    break
  case 'round':
    // arbitrarily set to 30 minutes
    timeAmount = 30
    break
  case 'rounds':
    timeAmount *= 30
    break
  default:
    timeAmount = 0
  }

  durationComponent.value = timeAmount

  if ( concentration ) {
    durationTypeComponent.value = DurationOption.Ongoing
  }

  components.push( durationComponent, durationTypeComponent )

  return components
}

function convertAttackTypeToSpellComponents( spell: SpellDetailResponse ): SpellComponent[] {
  const components: SpellComponent[] = []

  // how to tell if I have already added the range component?
  if ( spell.attack_type === 'ranged' ) {
    components.push({ type: 'range', value: 0 })
  } else if ( spell.attack_type === 'melee' ) {
    components.push({ type: 'range', value: 1 })
  }

  return components
}

function buildSpellComponents( spell: SpellDetailResponse ): SpellComponent[] {
  const components: SpellComponent[] = []

  for ( const key of Object.keys( spell )) {
    switch ( key ) {
    case 'area_of_effect':
      components.push({
        type: 'area',
        value: {
          type: spell.area_of_effect.type as AreaTypeOption,
          size: spell.area_of_effect.size
        }
      })
      break
    case 'attack_type':
      components.push( ...convertAttackTypeToSpellComponents( spell ))
      break
    case 'damage': {
      const damageOption = mapResponseToDamageOption( spell )

      if ( !damageOption ) {
        break
      }

      components.push({ type: 'damage', value: damageOption })
      break
    }
    case 'dc':
      components.push({
        type: 'difficultyClass',
        value: {
          parentAttribute: spell.dc.dc_type.index,
          success: spell.dc.dc_success,
        }
      })
      break
    case 'duration':
      components.push( ...convertDurationToSpellComponents( spell ))
      break
    case 'level':
      components.push({ type: 'level', value: spell.level })
      break
    case 'range':
      components.push( ...convertRangeToSpellComponents( spell ))
      break
    case 'school':
      components.push({ type: 'school', value: spell.school.index })
      break
    }
  }

  return components
}

async function import5eSpells(): Promise<SpellDetailResponse[]> {
  const spellIndexes: ImportAll5eSpellsResponse =
    await fetch( BASE_URL + '/api/spells' ).then(( response ) => {
      return response.json()
    })

  const detailedSpells: SpellDetailResponse[] = await Promise.all(
    spellIndexes.results.map( async ( index ) => {
      const response = await fetch( BASE_URL + index.url )
      return await response.json()
    })
  )

  return detailedSpells
}
