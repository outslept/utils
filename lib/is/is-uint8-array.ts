import getTag from '../../helpers/getTag'
import isObjectLike from './is-object-like'

/**
 * Checks if a value is a Uint8Array.
 * @param value - Value to check
 * @returns True if value is a Uint8Array
 */
function isUint8Array(value: unknown): value is Uint8Array {
  return isObjectLike(value) && getTag(value) === '[object Uint8Array]'
}

export default isUint8Array
