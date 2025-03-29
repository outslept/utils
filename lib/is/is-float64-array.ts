import getTag from '../../helpers/getTag'
import isObjectLike from './is-object-like'

/**
 * Checks if a value is a Float64Array.
 * @param value - Value to check
 * @returns True if value is a Float64Array
 */
function isFloat64Array(value: unknown): value is Float64Array {
  return isObjectLike(value) && getTag(value) === '[object Float64Array]'
}

export default isFloat64Array
