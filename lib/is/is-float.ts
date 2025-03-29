import isInteger from './is-integer'
import isNumber from './is-number'

/**
 * Checks if a value is a float (non-integer number).
 * @param value - Value to check
 * @returns True if value is a float
 */
function isFloat(value: unknown): value is number {
  return isNumber(value) && !isInteger(value)
}

export default isFloat
