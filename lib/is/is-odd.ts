import isInteger from './is-integer'
import isNumber from './is-number'

/**
 * Checks if a number is odd.
 * @param value - Value to check
 * @returns True if value is an odd number
 */
function isOdd(value: unknown): boolean {
  return isNumber(value) && isInteger(value) && (value % 2 !== 0)
}

export default isOdd
