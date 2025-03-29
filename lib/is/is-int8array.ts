import getTag from '../../helpers/getTag'
import isObjectLike from './is-object-like'

/**
 * Checks if a value is an Int8Array.
 * @param value - Value to check
 * @returns True if value is an Int8Array
 */
function isInt8Array(value: unknown): value is Int8Array {
  return isObjectLike(value) && getTag(value) === '[object Int8Array]'
}

export default isInt8Array
