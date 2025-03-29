import isNumber from './is-number'

/**
 * Checks if a number is zero.
 * @param value - Value to check
 * @returns True if value is zero
 */
function isZero(value: unknown): boolean {
  return isNumber(value) && value === 0
}

export default isZero
