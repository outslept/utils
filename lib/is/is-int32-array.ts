import getTag from '../../helpers/getTag'
import isObjectLike from './is-object-like'

/**
 * Checks if a value is an Int32Array.
 * @param value - Value to check
 * @returns True if value is an Int32Array
 */
function isInt32Array(value: unknown): value is Int32Array {
  return isObjectLike(value) && getTag(value) === '[object Int32Array]'
}

export default isInt32Array
