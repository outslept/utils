import getTag from '../../helpers/getTag'
import isObjectLike from './is-object-like'

/**
 * Checks if a value is a Set.
 * @param value - Value to check
 * @returns True if value is a Set
 */
function isSet<T = any>(value: unknown): value is Set<T> {
  return isObjectLike(value) && getTag(value) === '[object Set]'
}

export default isSet
