/**
 * Checks if a value is truthy.
 * @param value - Value to check
 * @returns True if value is truthy
 */
function isTruthy<T>(value: T): value is Exclude<T, false | 0 | -0 | '' | null | undefined | void> {
  return !!value
}

export default isTruthy
