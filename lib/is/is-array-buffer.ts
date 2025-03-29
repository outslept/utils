import getTag from '../../helpers/getTag'
import isObjectLike from './is-object-like'

/**
 * Checks if a value is an ArrayBuffer.
 * @param value - Value to check
 * @returns True if value is an ArrayBuffer
 */
function isArrayBuffer(value: unknown): value is ArrayBuffer {
  return isObjectLike(value) && getTag(value) === '[object ArrayBuffer]'
}

export default isArrayBuffer
