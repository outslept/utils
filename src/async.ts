import { sleep } from './time'

/**
 * Retries an asynchronous function multiple times with delay between attempts.
 *
 * Executes a function that returns a promise, and if it fails, retries it
 * up to the specified number of attempts with a delay between each attempt.
 *
 * @example
 * const result = await retry(
 *   () => fetchData(),
 *   {
 *     attempts: 3,
 *     delay: 1000,
 *     onError: (err, attempt) => console.log(`Attempt ${attempt} failed: ${err.message}`)
 *   }
 * );
 *
 * @template T - Return type of the function
 * @param fn - Async function to retry
 * @param options - Configuration options:
 *   - attempts: Maximum number of attempts
 *   - delay: Milliseconds to wait between attempts
 *   - onError: Optional callback for error handling
 * @returns Promise resolving to the function's result
 * @throws Last error encountered if all attempts fail
 */
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

/**
 * Wraps a promise with a timeout, rejecting if the original promise doesn't resolve in time.
 *
 * @example
 * try {
 *   const result = await withTimeout(fetchData(), 5000, 'Data fetch timed out');
 *   console.log(result);
 * } catch (error) {
 *   console.error(error.message); // 'Data fetch timed out' if it took too long
 * }
 *
 * @template T - Type of the promise result
 * @param promise - Promise to wrap with timeout
 * @param ms - Timeout in milliseconds
 * @param errorMessage - Custom error message for timeout (default: 'Operation timed out')
 * @returns Promise that resolves with the original result or rejects with timeout error
 */
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

/**
 * Processes an array of items sequentially with an async function.
 *
 * Unlike Promise.all(), this processes one item at a time, waiting for
 * each promise to resolve before starting the next item.
 *
 * @example
 * const userIds = [1, 2, 3, 4, 5];
 * const users = await asyncSequential(userIds, async (id) => {
 *   return await fetchUserById(id);
 * });
 *
 * @template T - Type of input items
 * @template R - Type of output results
 * @param items - Array of items to process
 * @param fn - Async function to apply to each item
 * @returns Promise resolving to array of results in the same order
 */
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

/**
 * Processes an array of items with limited concurrency.
 *
 * Similar to Promise.all() but limits the number of concurrent operations.
 * Useful for rate-limited APIs or controlling resource usage.
 *
 * @example
 * const urls = ['url1', 'url2', 'url3', 'url4', 'url5'];
 * const results = await asyncPool(2, urls, async (url) => {
 *   return await fetch(url);
 * });
 *
 * @template T - Type of input items
 * @template R - Type of output results
 * @param concurrency - Maximum number of concurrent operations
 * @param items - Array of items to process
 * @param fn - Async function to apply to each item
 * @returns Promise resolving to array of results in the same order as inputs
 */
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
