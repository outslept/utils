/**
 * Converts milliseconds to seconds.
 * @param ms - Milliseconds to convert
 * @returns Seconds
 */
export function toSeconds(ms: number): number {
  return Math.floor(ms / 1000)
}
