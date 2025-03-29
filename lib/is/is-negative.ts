import isNumber from './is-number'

/**
 * Checks if a number is negative.
 * @param value - Value to check
 * @returns True if value is a negative number
 */
function isNegative(value: unknown): boolean {
  return isNumber(value) && value < 0
}

export default isNegative
