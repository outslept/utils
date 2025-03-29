import getTag from '../../helpers/getTag'
import isObjectLike from './is-object-like'

/**
 * Checks if a value is a valid Date object.
 * @param value - Value to check
 * @returns True if value is a valid Date
 */
function isDate(value: unknown): value is Date {
  if (!isObjectLike(value) || getTag(value) !== '[object Date]') {
    return false
  }

  return !Number.isNaN((value as Date).getTime())
}

export default isDate
