import getTag from '../../helpers/getTag'
import isObjectLike from './is-object-like'

/**
 * Checks if a value is a Uint32Array.
 * @param value - Value to check
 * @returns True if value is a Uint32Array
 */
function isUint32Array(value: unknown): value is Uint32Array {
  return isObjectLike(value) && getTag(value) === '[object Uint32Array]'
}

export default isUint32Array
