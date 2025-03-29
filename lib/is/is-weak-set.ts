import getTag from '../../helpers/getTag'
import isObjectLike from './is-object-like'

/**
 * Checks if a value is a WeakSet.
 * @param value - Value to check
 * @returns True if value is a WeakSet
 */
function isWeakSet<T extends object = object>(value: unknown): value is WeakSet<T> {
  return isObjectLike(value) && getTag(value) === '[object WeakSet]'
}

export default isWeakSet
