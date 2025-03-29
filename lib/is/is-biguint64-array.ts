import getTag from '../../helpers/getTag'
import isObjectLike from './is-object-like'

/**
 * Checks if a value is a BigUint64Array.
 * @param value - Value to check
 * @returns True if value is a BigUint64Array
 */
function isBigUint64Array(value: unknown): value is BigUint64Array {
  return isObjectLike(value) && getTag(value) === '[object BigUint64Array]'
}

export default isBigUint64Array
