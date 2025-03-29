import getTag from '../../helpers/getTag'
import isObjectLike from './is-object-like'

/**
 * Checks if a value is a Blob object.
 * @param value - Value to check
 * @returns True if value is a Blob object
 */
function isBlob(value: unknown): value is Blob {
  return isObjectLike(value) && getTag(value) === '[object Blob]'
}

export default isBlob
