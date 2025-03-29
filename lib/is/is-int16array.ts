import getTag from '../../helpers/getTag'
import isObjectLike from './is-object-like'

/**
 * Checks if a value is an Int16Array.
 * @param value - Value to check
 * @returns True if value is an Int16Array
 */
function isInt16Array(value: unknown): value is Int16Array {
  return isObjectLike(value) && getTag(value) === '[object Int16Array]'
}

export default isInt16Array
