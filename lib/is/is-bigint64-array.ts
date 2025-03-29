import getTag from '../../helpers/getTag'
import isObjectLike from './is-object-like'

/**
 * Checks if a value is a BigInt64Array.
 * @param value - Value to check
 * @returns True if value is a BigInt64Array
 */
function isBigInt64Array(value: unknown): value is BigInt64Array {
  return isObjectLike(value) && getTag(value) === '[object BigInt64Array]'
}

export default isBigInt64Array
