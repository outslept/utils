export const timestamp = (): number => +Date.now()

export const toSeconds = (ms: number): number => Math.floor(ms / 1000)

export const toMilliseconds = (s: number): number => s * 1000

export const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

export function createTimeElapsed(): () => number {
  const start = timestamp()
  return () => timestamp() - start
}

export function formatDuration(ms: number, format: 'short' | 'long' = 'short'): string {
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
