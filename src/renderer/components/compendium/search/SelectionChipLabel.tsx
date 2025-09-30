import { FC, useState } from 'react'

import { iterateToNextValue } from '../utilities'

interface ChipLabelProps {
  currentValue: string,
  possibleValues: string[]
}

// reusable chip component with the ability to cycle the label
// this doesn't update state
const SelectionChipLabel: FC<ChipLabelProps> = ({ currentValue, possibleValues }) => {
  const [ entry, setEntry ] = useState<string>( currentValue )

  const cycleToNextLabel = () => {
    const newIndex = iterateToNextValue( entry, possibleValues )
    setEntry( possibleValues[newIndex] )
  }

  return (
    <span
      onClick={cycleToNextLabel}
      style={{ cursor: 'pointer' }}
    >
      {entry}
    </span>
  )
}

export default SelectionChipLabel
