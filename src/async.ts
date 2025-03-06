import { sleep } from './time'

async function retry<T>(
  fn: () => Promise<T>,
  options: { attempts: number, delay: number, onError?: (error: Error, attempt: number) => void },
): Promise<T> {
  let lastError: Error
  for (let attempt = 1; attempt <= options.attempts; attempt++) {
    try {
      return await fn()
    }
    catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
      if (options.onError) {
        options.onError(lastError, attempt)
      }
      if (attempt < options.attempts) {
        await sleep(options.delay)
      }
    }
  }
  throw lastError!
}

function withTimeout<T>(promise: Promise<T>, ms: number, errorMessage = 'Operation timed out'): Promise<T> {
  let timeoutId: NodeJS.Timeout
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(errorMessage)), ms)
  })

  return Promise.race([
    promise.finally(() => clearTimeout(timeoutId)),
    timeoutPromise,
  ])
}

async function asyncSequential<T, R>(
  items: T[],
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = []
  for (let i = 0; i < items.length; i++) {
    results.push(await fn(items[i], i))
  }
  return results
}

async function asyncPool<T, R>(
  concurrency: number,
  items: T[],
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = Array.from({ length: items.length })
  let index = 0

  const executor = async (): Promise<void> => {
    while (index < items.length) {
      const currentIndex = index++
      results[currentIndex] = await fn(items[currentIndex], currentIndex)
    }
  }

  const executors = Array.from({ length: Math.min(concurrency, items.length) })
    .fill(null)
    .map(() => executor())

  await Promise.all(executors)
  return results
}

export {
  asyncPool,
  asyncSequential,
  retry,
  withTimeout,
}
