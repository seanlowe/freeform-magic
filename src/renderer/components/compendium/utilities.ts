/**
 * Iterates to the next value in the possibleValues array,
 * wrapping around if necessary.
 *
 * @param {string} currentValue the current value
 * @param {string[]} possibleValues the array of possible values
 *
 * @returns
 */
export const iterateToNextValue = ( currentValue: string, possibleValues: string[] ) => {
  let currentIndex = possibleValues.indexOf( currentValue )
  if ( currentIndex === possibleValues.length - 1 ) {
    currentIndex = 0
  } else {
    currentIndex++
  }

  return currentIndex
}
