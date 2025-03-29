import getTag from '../../helpers/getTag'

/**
 * Checks if a value is a plain object (created by {} or new Object()).
 * @param value - Value to check
 * @returns True if value is a plain object
 */
function isPlainObject<T extends object = object>(value: unknown): value is T {
  if (getTag(value) !== '[object Object]') {
    return false
  }

  const prototype = Object.getPrototypeOf(value)
  return prototype === null || prototype === Object.prototype
}

export default isPlainObject
