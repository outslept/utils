/**
 * Rounds a number to a specified number of decimal places.
 * @param n - Number to round
 * @param decimals - Number of decimal places
 * @returns Rounded number
 */
export function roundTo(n: number, decimals = 0): number {
  if (decimals < 0 || !Number.isInteger(decimals)) {
    throw new Error('decimals must be a non-negative integer')
  }
  const factor = 10 ** decimals
  return Math.round((n + Number.EPSILON) * factor) / factor
}
