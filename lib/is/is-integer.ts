import isNumber from './is-number'

/**
 * Checks if a value is an integer.
 * @param value - Value to check
 * @returns True if value is an integer
 */
function isInteger(value: unknown): value is number {
  return isNumber(value) && Number.isInteger(value)
}

export default isInteger
