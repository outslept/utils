import getTag from '../../helpers/getTag'
import isFunction from './is-function'

/**
 * Checks if a value is a generator function.
 * @param value - Value to check
 * @returns True if value is a generator function
 */
function isGeneratorFunction<T extends Function = Function>(value: unknown): value is T {
  return isFunction (value) && getTag(value) === '[object GeneratorFunction]'
}

export default isGeneratorFunction
