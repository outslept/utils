import isFunction from './is-function'
import isLength from './is-length'
import isObjectLike from './is-object-like'
import isString from './is-string'

/**
 * Checks if a value is array-like.
 * @param value - Value to check
 * @returns True if value is array-like
 */
function isArrayLike<T = any>(value: unknown): value is ArrayLike<T> {
  if (isString(value)) {
    return true
  }

  if (!isObjectLike(value) || isFunction(value)) {
    return false
  }

  const length = 'length' in value ? (value as { length: unknown }).length : undefined

  return isLength(length)
}

export default isArrayLike
