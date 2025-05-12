import isString from '../is/is-string'

/**
 * Checks if a value is a non-empty string.
 *
 * @example
 * isNonEmptyString('hello');  // true
 * isNonEmptyString('');       // false
 * isNonEmptyString('   ');    // false (trims whitespace)
 * isNonEmptyString(123);      // false (not a string)
 *
 * @param v - Value to check
 * @returns True if value is a string with non-whitespace content
 */
export function isNonEmptyString(v: unknown): v is string {
  return isString(v) && v.trim().length > 0
}
