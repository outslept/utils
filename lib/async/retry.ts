import { sleep } from '../time/sleep'

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
 * @param options - Configuration options
 * @param options.attempts - Maximum number of attempts
 * @param options.delay - Milliseconds to wait between attempts
 * @param options.onError - Optional callback for error handling
 * @returns Promise resolving to the function's result
 * @throws Last error encountered if all attempts fail
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: { attempts: number, delay: number, onError?: (error: Error, attempt: number) => void },
): Promise<T> {
  let lastError: Error = new Error('Unknown error occurred')

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
  throw lastError
}
