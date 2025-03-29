/**
 * Checks if a value is a valid array-like length.
 * @param value - Value to check
 * @returns True if value is a valid length
 */
function isLength(value: unknown): value is number {
  return typeof value === 'number'
    && value > -1
    && value % 1 === 0
    && value <= Number.MAX_SAFE_INTEGER
}

export default isLength
