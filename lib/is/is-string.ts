/**
 * Checks if a value is a string.
 * @param value - Value to check
 * @returns True if value is a string
 */
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export default isString
