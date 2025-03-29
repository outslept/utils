import { clamp } from './clamp'

/**
 * Linear interpolation between two values.
 * @param min - Start value
 * @param max - End value
 * @param t - Interpolation factor (0-1)
 * @returns Interpolated value
 */
export function lerp(min: number, max: number, t: number): number {
  const interpolation = clamp(t, 0.0, 1.0)
  return min + (max - min) * interpolation
}
