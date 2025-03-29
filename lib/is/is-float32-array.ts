import getTag from '../../helpers/getTag'
import isObjectLike from './is-object-like'
/**
 * Checks if a value is a Float32Array.
 * @param value - Value to check
 * @returns True if value is a Float32Array
 */
function isFloat32Array(value: unknown): value is Float32Array {
  return isObjectLike(value) && getTag(value) === '[object Float32Array]'
}

export default isFloat32Array
