/**
 * Checks if two numbers are approximately equal within epsilon.
 * @param a - First number
 * @param b - Second number
 * @param epsilon - Maximum difference
 * @returns True if numbers are approximately equal
 */
export function approxEquals(a: number, b: number, epsilon = 1e-6): boolean {
  if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(epsilon) || epsilon < 0) {
    return false
  }
  return Math.abs(a - b) < epsilon
}
