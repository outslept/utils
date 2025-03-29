/**
 * Generates a random float between min and max.
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random float
 */
export function randFloat(min: number, max: number): number {
  const [minVal, maxVal] = [Math.min(min, max), Math.max(min, max)]
  if (!Number.isFinite(minVal) || !Number.isFinite(maxVal)) {
    return Number.NaN
  }

  return Math.random() * (maxVal - minVal) + minVal
}
