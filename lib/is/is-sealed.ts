import isObject from './is-object'

/**
 * Checks if an object is sealed.
 * @param value - Value to check
 * @returns True if object is sealed
 */
function isSealed(value: unknown): boolean {
  return isObject(value) && Object.isSealed(value)
}

export default isSealed
