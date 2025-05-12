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
export async function asyncSequential<T, R>(
  items: T[],
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = []
  for (let i = 0; i < items.length; i++) {
    results.push(await fn(items[i], i))
  }
  return results
}
