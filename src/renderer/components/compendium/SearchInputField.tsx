import React, { SetStateAction } from 'react'

import { componentToComponentValuesMap } from './constants'

interface SearchInputFieldProps {
  component: string
  setComponentValues: ( prev: SetStateAction<string[]> ) => void
}

const SearchInputField: React.FC<SearchInputFieldProps> = ({
  component,
  setComponentValues
}) => {
  if ( !component || !componentToComponentValuesMap.has( component )) {
    console.log( 'returing null' )
    return <></>
  }
  
  const componentValues = componentToComponentValuesMap.get( component )
  
  console.log({ componentValues })

  return (
    <select
      onChange={( e ) => {
        return setComponentValues(( prev: any ) => {
          return { ...prev, damage: e.target.value } 
        }) 
      }}
      style={{ padding: '0.5rem', width: '100%' }}
    >
      {componentValues.map(( value: any ) => {
        return (
          <option key={value} value={value}>{value}</option>
        )
      })}
    </select>
  )

  // return (
  //   <>
  //     {component === AvailableComponents.Area && (
  //       <input
  //         type='number'
  //         placeholder='Enter size'
  //         onChange={( e ) => {
  //           return setComponentValues(( prev: any ) => {
  //             return { ...prev, area: e.target.value } 
  //           }) 
  //         }}
  //         style={{ padding: '0.5rem', width: '100%' }}
  //       />
  //     )}
  //     {component === 'damage' && (
  //       <select
  //         onChange={( e ) => {
  //           return setComponentValues(( prev: any ) => {
  //             return { ...prev, damage: e.target.value } 
  //           }) 
  //         }}
  //         style={{ padding: '0.5rem', width: '100%' }}
  //       >
  //         <option value='Bludgeoning'>Bludgeoning</option>
  //         <option value='Force'>Force</option>
  //         <option value='Piercing'>Piercing</option>
  //         <option value='Slashing'>Slashing</option>
  //         <option value='Elemental'>Elemental</option>
  //       </select>
  //     )}
  //     {component === 'duration' && (
  //       <input
  //         type='number'
  //         placeholder='Enter duration'
  //         onChange={( e ) => {
  //           return setComponentValues(( prev: any ) => {
  //             return { ...prev, duration: e.target.value } 
  //           }) 
  //         }}
  //         style={{ padding: '0.5rem', width: '100%' }}
  //       />
  //     )}
  //   </>
  // ) 
}
export default SearchInputField
