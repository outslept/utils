/**
 * Checks if a value is negative zero.
 * @param value - Value to check
 * @returns True if value is -0
 */
function isNegativeZero(value: unknown): boolean {
  return value === 0 && 1 / (value as number) === -Infinity
}

export default isNegativeZero
