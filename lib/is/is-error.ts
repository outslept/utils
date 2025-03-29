import getTag from '../../helpers/getTag'
import isObjectLike from './is-object-like'

/**
 * Checks if a value is an Error object.
 * @param value - Value to check
 * @returns True if value is an Error
 */
function isError(value: unknown): value is Error {
  return isObjectLike(value) && (value instanceof Error || getTag(value) === '[object Error]')
}

export default isError
