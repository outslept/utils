/**
 * Converts degrees to radians.
 * @param degrees - Angle in degrees
 * @returns Angle in radians
 */
export function degToRad(degrees: number): number {
  if (!Number.isFinite(degrees)) {
    return Number.NaN
  }
  return degrees * (Math.PI / 180)
}
