import isFunction from './is-function'
import isObjectLike from './is-object-like'

/**
 * Checks if a value is async iterable.
 * @param value - Value to check
 * @returns True if value is async iterable
 */
function isAsyncIterable<T = any>(value: unknown): value is AsyncIterable<T> {
  if (value == null || !isObjectLike(value)) {
    return false
  }

  return Symbol.asyncIterator in value
    && isFunction((value as Record<symbol, unknown>)[Symbol.asyncIterator])
}

export default isAsyncIterable
