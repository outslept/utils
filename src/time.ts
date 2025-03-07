/**
 * Returns the current timestamp in milliseconds.
 *
 * @returns Current timestamp as milliseconds since Unix epoch
 */
const timestamp = (): number => +Date.now()

/**
 * Converts milliseconds to seconds.
 *
 * @param ms - Time in milliseconds
 * @returns Time in seconds (floored to remove fractional seconds)
 */
const toSeconds = (ms: number): number => Math.floor(ms / 1000)

/**
 * Converts seconds to milliseconds.
 *
 * @param s - Time in seconds
 * @returns Time in milliseconds
 */
const toMilliseconds = (s: number): number => s * 1000

/**
 * Creates a promise that resolves after the specified delay.
 *
 * @param ms - Time to sleep in milliseconds.
 * @returns Promise that resolves after the specified delay.
 */
const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Creates a function that measures elapsed time since creation.
 *
 * @example
 * const getElapsed = createTimeElapsed()
 * // Do something
 * console.log(`Time taken: ${getElapsed()} ms`);
 * @returns Function that returns the
 * elapsed time in milliseconds when called.
 */
function createTimeElapsed(): () => number {
  const start = timestamp()
  return () => timestamp() - start
}

/**
 * Formats a duration in milliseconds to a human-readable string.
 * Supports both short (1d 2h 3m 4s) and long (1 day 2 hours 3 minutes 4 seconds) formats.
 *
 * @example
 * formatDuration(90061000, 'short'); // "1d 1h 1m 1s"
 * formatDuration(90061000, 'long');  // "1 day 1 hour 1 minute 1 second"
 *
 * @param ms - Duration in milliseconds to format
 * @param format - Output format: 'short' for compact or 'long' for full words (default: 'short')
 * @returns Formatted duration string
 */
function formatDuration(ms: number, format: 'short' | 'long' = 'short'): string {
  const timeUnits = [
    { unit: 'day', ms: 86400000, short: 'd' },
    { unit: 'hour', ms: 3600000, short: 'h' },
    { unit: 'minute', ms: 60000, short: 'm' },
    { unit: 'second', ms: 1000, short: 's' },
  ]

  const parts: string[] = []
  let remaining = ms

  for (const { unit, ms: unitMs, short } of timeUnits) {
    const value = Math.floor(remaining / unitMs)
    if (value > 0) {
      parts.push(
        format === 'short'
          ? `${value}${short}`
          : `${value} ${unit}${value !== 1 ? 's' : ''}`,
      )
      remaining %= unitMs
    }
  }

  return parts.length > 0 ? parts.join(' ') : '0s'
}

export {
  createTimeElapsed,
  formatDuration,
  sleep,
  timestamp,
  toMilliseconds,
  toSeconds,
}
