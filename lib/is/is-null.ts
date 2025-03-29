/**
 * Checks if a value is null.
 * @param value - Value to check
 * @returns True if value is null
 */
function isNull(value: unknown): value is null {
  return value === null
}

export default isNull
