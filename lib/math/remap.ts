import { lerp } from './lerp'

/**
 * Maps a value from one range to another.
 * @param n - Value to map
 * @param inMin - Input range minimum
 * @param inMax - Input range maximum
 * @param outMin - Output range minimum
 * @param outMax - Output range maximum
 * @returns Mapped value
 */
export function remap(n: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  if (!Number.isFinite(n) || !Number.isFinite(inMin) || !Number.isFinite(inMax)
    || !Number.isFinite(outMin) || !Number.isFinite(outMax)) {
    return Number.NaN
  }

  if (inMin === inMax) {
    return (outMin + outMax) / 2
  }

  return lerp(outMin, outMax, (n - inMin) / (inMax - inMin))
}
