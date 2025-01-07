/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

import { AttributeOption } from '../../../types/characters.types'
import {
  AreaTypeOption,
  DamageTypeOption,
  DeliveryOption,
  DurationOption,
  SchoolOption,
  TargetOption
} from '../../../types/spells.types'

interface SearchSpellsFormProps {
  setSearchQuery: ( query: string ) => void;
  setIsFilteringSpells: ( isFiltering: boolean ) => void;
  filterSpells: ( query: string, selectedComponents: string[], componentValues: string[] ) => void;
}

enum AvailableComponents {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const componentToComponentValuesMap: Map<AvailableComponents, any> =
//  new Map<AvailableComponents, any>({
//    'area': AreaTypeOption,
//  })

const componentToComponentValuesMap: Map<AvailableComponents, any> =
 new Map<AvailableComponents, any>( [
   [ AvailableComponents.Area, AreaTypeOption ],
   [ AvailableComponents.Damage, DamageTypeOption ],
   [ AvailableComponents.Delivery, DeliveryOption ],
   [ AvailableComponents.DifficultyClass, AttributeOption ], // Assuming difficulty class relates to attributes
   [ AvailableComponents.DurationType, DurationOption ],
   [ AvailableComponents.Level, null ], // If there's no specific options, set null or undefined
   [ AvailableComponents.Range, null ],
   [ AvailableComponents.School, SchoolOption ],
   [ AvailableComponents.Target, TargetOption ],
 ] )

const SearchSpellsForm: React.FC<SearchSpellsFormProps> = ({
  setSearchQuery,
  setIsFilteringSpells,
  filterSpells
}) => {
  const [ tempSearchQuery, setTempSearchQuery ] = useState( '' )
  const [ selectedComponents, setSelectedComponents ] = useState<string[]>( [] )
  const [ componentValues, setComponentValues ] = useState<string[]>( [] )
  
  return (
    <div style={{ padding: '1rem' }}>
      <h3>Filter Spells</h3>
      <input
        type='text'
        value={tempSearchQuery}
        onChange={( e ) => {
          setTempSearchQuery( e.target.value )
        }}
        onKeyDown={( e ) => {
          if ( e.key === 'Enter' ) {
            setSearchQuery( tempSearchQuery )
            filterSpells( tempSearchQuery, selectedComponents, componentValues )
          }
        }}
        placeholder='Enter spell name'
        style={{ padding: '0.5rem', marginBottom: '1rem' }}
      />
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Filter by Components:</label>
        <select
          multiple
          onChange={( e ) => {
            const selectedComponents = Array.from( e.target.selectedOptions, ( option ) => {
              return option.value 
            })
            setSelectedComponents( selectedComponents )
          }}
          style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
        >
          <option value='area'>Area</option>
          <option value='damage'>Damage</option>
          <option value='delivery'>Delivery</option>
          <option value='difficultyClass'>Difficulty Class</option>
          <option value='duration'>Duration</option>
          <option value='durationType'>Duration Type</option>
          <option value='level'>Level</option>
          <option value='range'>Range</option>
          <option value='school'>School</option>
          <option value='target'>Target</option>
        </select>

        {selectedComponents.map(( component ) => {
          return (
            <div key={component} style={{ marginBottom: '1rem' }}>
              <label>{component} Options:</label>
              {component === 'area' && (
                <input
                  type='number'
                  placeholder='Enter size'
                  onChange={( e ) => {
                    return setComponentValues(( prev ) => {
                      return { ...prev, area: e.target.value } 
                    }) 
                  }}
                  style={{ padding: '0.5rem', width: '100%' }}
                />
              )}
              {component === 'damage' && (
                <select
                  onChange={( e ) => {
                    return setComponentValues(( prev ) => {
                      return { ...prev, damage: e.target.value } 
                    }) 
                  }}
                  style={{ padding: '0.5rem', width: '100%' }}
                >
                  <option value='Bludgeoning'>Bludgeoning</option>
                  <option value='Force'>Force</option>
                  <option value='Piercing'>Piercing</option>
                  <option value='Slashing'>Slashing</option>
                  <option value='Elemental'>Elemental</option>
                </select>
              )}
              {component === 'duration' && (
                <input
                  type='number'
                  placeholder='Enter duration'
                  onChange={( e ) => {
                    return setComponentValues(( prev ) => {
                      return { ...prev, duration: e.target.value } 
                    }) 
                  }}
                  style={{ padding: '0.5rem', width: '100%' }}
                />
              )}
              {/* Add more cases for other components as needed */}
            </div>
          ) 
        })}
      </div>
      <div>
        <button
          style={{
            padding: '0.5rem 1rem',
            marginRight: '1rem',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={() => {
            setSearchQuery( tempSearchQuery )
            filterSpells( tempSearchQuery, selectedComponents, componentValues )
          }}
        >
      Search
        </button>
        <button
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={() => {
            setIsFilteringSpells( false )
          }}
        >
      Back
        </button>
      </div>
    </div>

  )
}

export default SearchSpellsForm
