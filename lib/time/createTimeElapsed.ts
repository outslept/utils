import { timestamp } from './timestamp'

/**
 * Creates a function that measures elapsed time from creation.
 * @returns Function that returns elapsed time in milliseconds
 */
export function createTimeElapsed(): () => number {
  const start = timestamp()
  return () => timestamp() - start
}
