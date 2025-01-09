import React, { useState } from 'react'

import { checkIfComponentIsInMapAndHasValue } from '../spells/utilities'

interface SearchInputFieldProps {
  component: string
  setSelectedComponentValue: React.Dispatch<React.SetStateAction<string>>
}

const SearchInputField: React.FC<SearchInputFieldProps> = ({
  component,
  setSelectedComponentValue,
}) => {
  const [ selectedValue, setSelectedValue ] = useState<string>( '' )

  const componentValues = checkIfComponentIsInMapAndHasValue( component )
  if ( !componentValues ) { 
    return <></>
  }

  return (
    <select
      defaultValue={selectedValue}
      style={{ padding: '0.5rem', width: '100%' }}
      onClick={( e ) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore yes e.target.value does exist, dummy
        setSelectedComponentValue( e.target.value )
      }}
    >
      {componentValues.map(( value: string ) => {
        return (
          <option
            key={value}
            value={value}
            onClick={() => {
              setSelectedComponentValue( value )
              setSelectedValue( value )
            }}
          >
            {value}
          </option>
        )
      })}
    </select>
  )
}

export default SearchInputField
