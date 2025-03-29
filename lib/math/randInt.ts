/**
 * Generates a random integer between min and max (inclusive).
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random integer
 */
export function randInt(min: number, max: number): number {
  const [minVal, maxVal] = [Math.min(min, max), Math.max(min, max)]
  if (!Number.isFinite(minVal) || !Number.isFinite(maxVal)) {
    return Number.NaN
  }

  min = Math.ceil(minVal)
  max = Math.floor(maxVal)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
