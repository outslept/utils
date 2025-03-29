/**
 * Checks if a value is falsy.
 * @template T - Type of the value
 * @param value - Value to check
 * @returns True if value is falsy (0, -0, 0n, -0n, '', false, null, undefined, NaN)
 */
function isFalsy<T>(value: T): value is Extract<T, 0 | -0 | 0n | -0n | '' | false | null | undefined | void | { valueOf: () => 0 | -0 | 0n | -0n | '' | false | null | undefined }> {
  return !value
}

export default isFalsy
