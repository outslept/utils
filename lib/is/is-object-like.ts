/**
 * Checks if a value is object-like.
 * @param value - Value to check
 * @returns True if value is object-like
 */
function isObjectLike(value: unknown): value is object {
  return typeof value === 'object' && value !== null
}

export default isObjectLike
