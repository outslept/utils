import isArray from './is-array'
import isMap from './is-map'
import isNullish from './is-nullish'
import isObject from './is-object'
import isSet from './is-set'
import isString from './is-string'

/**
 * Checks if a value is empty.
 * @param value - Value to check
 * @returns True if value is empty
 */
function isEmpty(value: unknown): boolean {
  if (isNullish(value))
    return true
  if (isString(value))
    return value.trim().length === 0
  if (isArray(value))
    return value.length === 0
  if (isMap(value) || isSet(value))
    return value.size === 0
  if (isObject(value))
    return Object.keys(value).length === 0
  return false
}

export default isEmpty
