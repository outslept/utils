/**
 * Checks if a value is a number (excluding NaN).
 * @param value - Value to check
 * @returns True if value is a number
 */
function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value)
}

export default isNumber
