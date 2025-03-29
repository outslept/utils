import isNumber from './is-number'

/**
 * Checks if a number is positive.
 * @param value - Value to check
 * @returns True if value is a positive number
 */
function isPositive(value: unknown): boolean {
  return isNumber(value) && value > 0
}

export default isPositive
