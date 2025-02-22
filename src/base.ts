/**
 * Asserts condition is truthy
 * @param condition - Condition to assert
 * @param message - Error message
 */
export function assert(condition: boolean, message: string): asserts condition {
  if (!condition)
    throw new Error(message)
}

/**
 * Returns string representation of value
 * @param v - Value to convert
 */
export const toString = (v: any): string => Object.prototype.toString.call(v)

/**
 * Returns type name of value
 * @param v - Value to get type name of
 */
export function getTypeName(v: any): string {
  if (v === null)
    return 'null'
  const type = toString(v).slice(8, -1).toLowerCase()
  return (typeof v === 'object' || typeof v === 'function') ? type : typeof v
}

/**
 * No-op function
 */
export function noop(): void {}
