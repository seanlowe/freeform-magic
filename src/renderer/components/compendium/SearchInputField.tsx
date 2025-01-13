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
  const componentValues = checkIfComponentIsInMapAndHasValue( component )
  if ( !componentValues ) { 
    return <></>
  }

  const [ selectedValue, setSelectedValue ] = useState<string>( componentValues[ 0 ] )

  const renderComponentValues = () => {
    const options = []
    for ( const value of componentValues ) {
      const optionJSX = (
        <option
          key={value}
          value={value}
          onClick={( e ) => {
            console.log( 'inside the onclick' )
            setSelectedComponentValue( e.target.value )
            setSelectedValue( e.target.value )
          }}
        >
          {value}
        </option>
      )

      options.push( optionJSX )
    }

    return <> {options} </>
  }

  return (
    <select
      defaultValue={selectedValue}
      style={{ padding: '0.5rem', width: '100%' }}
    >
      {renderComponentValues()}
    </select>
  )
}

export default SearchInputField
