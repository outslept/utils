export const timestamp = (): number => +Date.now()

export const toSeconds = (ms: number): number => Math.floor(ms / 1000)

export const toMilliseconds = (s: number): number => s * 1000

export const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

export function createTimeElapsed(): () => number {
  const start = timestamp()
  return () => timestamp() - start
}
