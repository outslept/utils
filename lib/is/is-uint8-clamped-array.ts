import getTag from '../../helpers/getTag'
import isObjectLike from './is-object-like'

/**
 * Checks if a value is a Uint8ClampedArray.
 * @param value - Value to check
 * @returns True if value is a Uint8ClampedArray
 */
function isUint8ClampedArray(value: unknown): value is Uint8ClampedArray {
  return isObjectLike(value) && getTag(value) === '[object Uint8ClampedArray]'
}

export default isUint8ClampedArray
