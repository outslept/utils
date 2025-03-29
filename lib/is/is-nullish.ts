import isNull from './is-null'
import isUndefined from './is-undefined'

/**
 * Checks if a value is nullish (null or undefined).
 * @param value - Value to check
 * @returns True if value is null or undefined
 */
function isNullish(value: unknown): value is null | undefined {
  return isNull(value) || isUndefined(value)
}

export default isNullish
