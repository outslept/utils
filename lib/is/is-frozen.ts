import isObject from './is-object'

/**
 * Checks if an object is frozen.
 * @param value - Value to check
 * @returns True if object is frozen
 */
function isFrozen(value: unknown): boolean {
  return isObject(value) && Object.isFrozen(value)
}

export default isFrozen
