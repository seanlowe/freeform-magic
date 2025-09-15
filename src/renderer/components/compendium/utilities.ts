/**
 * Iterates to the next value in the possibleValues array,
 * wrapping around if necessary.
 *
 * @param {any} currentValue the current value
 * @param {any[]} possibleValues the array of possible values
 *
 * @returns
 */
export const iterateToNextValue = ( currentValue: any, possibleValues: any[] ) => {
  let currentIndex = possibleValues.indexOf( currentValue )
  if ( currentIndex === possibleValues.length - 1 ) {
    currentIndex = 0
  } else {
    currentIndex++
  }

  return currentIndex
}
