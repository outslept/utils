/**
 * Checks if a value is a safe integer.
 * @param value - Value to check
 * @returns True if value is a safe integer
 */
function isSafeInteger(value: unknown): value is number {
  return Number.isSafeInteger(value)
}

export default isSafeInteger
