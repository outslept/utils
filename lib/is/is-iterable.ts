import isFunction from './is-function'

/**
 * Checks if a value is iterable.
 * @param value - Value to check
 * @returns True if value is iterable
 */
function isIterable<T = any>(value: unknown): value is Iterable<T> {
  return value != null && isFunction((value as any)[Symbol.iterator])
}

export default isIterable
