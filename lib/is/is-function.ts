/* eslint-disable ts/no-unsafe-function-type */
/**
 * Checks if a value is a function.
 * @param value - Value to check
 * @returns True if value is a function
 */
function isFunction<T extends Function = Function>(value: unknown): value is T {
  return typeof value === 'function'
}

export default isFunction
