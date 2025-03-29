/**
 * Constrains a number between min and max values.
 * @param n - Number to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped number
 */
export function clamp(n: number, min: number, max: number): number {
  const [minVal, maxVal] = [Math.min(min, max), Math.max(min, max)]
  return Math.min(maxVal, Math.max(minVal, n))
}
