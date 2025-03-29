import getTag from '../../helpers/getTag'

/**
 * Checks if a value is a RegExp.
 * @param value - Value to check
 * @returns True if value is a RegExp
 */
function isRegExp(value: unknown): value is RegExp {
  return getTag(value) === '[object RegExp]'
}

export default isRegExp
