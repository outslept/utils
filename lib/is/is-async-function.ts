/* eslint-disable ts/no-unsafe-function-type */
import getTag from '../../helpers/getTag'
import isFunction from './is-function'

/**
 * Checks if a value is an async function.
 * @param value - Value to check
 * @returns True if value is an async function
 */
function isAsyncFunction<T extends Function = Function>(value: unknown): value is T {
  return isFunction(value) && getTag(value) === '[object AsyncFunction]'
}

export default isAsyncFunction
