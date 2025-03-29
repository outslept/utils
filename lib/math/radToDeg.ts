/**
 * Converts radians to degrees.
 * @param radians - Angle in radians
 * @returns Angle in degrees
 */
export function radToDeg(radians: number): number {
  if (!Number.isFinite(radians)) {
    return Number.NaN
  }

  return radians * (180 / Math.PI)
}
