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
export async function asyncPool<T, R>(
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
