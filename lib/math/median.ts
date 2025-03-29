/**
 * Calculates the median of numbers.
 * @param numbers - Numbers to find median of
 * @returns Median value
 */
export function median(...numbers: number[]): number {
  if (numbers.length === 0)
    return Number.NaN
  const sorted = [...numbers].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}
