import isBigInt from './is-bigint'
import isBoolean from './is-boolean'
import isNull from './is-null'
import isNumber from './is-number'
import isString from './is-string'
import isSymbol from './is-symbol'
import isUndefined from './is-undefined'

/**
 * Checks if a value is a primitive.
 * @param value - Value to check
 * @returns True if value is a primitive
 */
function isPrimitive(value: unknown): boolean {
  return (
    isString(value)
    || isNumber(value)
    || isBoolean(value)
    || isSymbol(value)
    || isBigInt(value)
    || isNull(value)
    || isUndefined(value)
  )
}

export default isPrimitive
