import isInteger from './is-integer'
import isNumber from './is-number'

/**
 * Checks if a number is even.
 * @param value - Value to check
 * @returns True if value is an even number
 */
function isEven(value: unknown): boolean {
  return isNumber(value) && isInteger(value) && (value % 2 === 0)
}

export default isEven
