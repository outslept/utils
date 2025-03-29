import isFunction from './is-function'

/**
 * Checks if a value is a Promise.
 * @param value - Value to check
 * @returns True if value is a Promise
 */
function isPromise<T = any>(value: unknown): value is Promise<T> {
  return (
    !!value
    && (typeof value === 'object' || typeof value === 'function')
    && isFunction((value as any).then)
    && isFunction((value as any).catch)
  )
}

export default isPromise
