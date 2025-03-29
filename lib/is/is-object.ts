import getTag from '../../helpers/getTag'

/**
 * Checks if a value is an object.
 * @param value - Value to check
 * @returns True if value is an object
 */
function isObject<T extends object = object>(value: unknown): value is T {
  return getTag(value) === '[object Object]'
}

export default isObject
