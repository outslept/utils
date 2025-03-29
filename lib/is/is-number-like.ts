import isNumber from './is-number'
import isString from './is-string'

/**
 * Checks if a value is number-like (can be converted to a number).
 * @param value - Value to check
 * @returns True if value is number-like
 */
function isNumberLike(value: unknown): boolean {
  if (isNumber(value))
    return true
  if (!isString(value))
    return false

  const trimmed = value.trim()
  if (trimmed === '')
    return false

  return !Number.isNaN(Number(trimmed))
}

export default isNumberLike
