/**
 * Gets the fractional part of a number.
 * @param n - Input number
 * @returns Fractional part
 */
export function fract(n: number): number {
  if (!Number.isFinite(n)) {
    return Number.NaN
  }

  return n - Math.trunc(n)
}
