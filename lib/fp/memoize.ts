/**
 * Creates a memoized version of a function that caches results for repeated calls.
 *
 * Uses the stringified arguments as a cache key. Best for pure functions with
 * primitive arguments or serializable objects.
 *
 * @example
 * const expensiveCalculation = memoize((n: number) => {
 *   console.log('Computing...');
 *   return n * n;
 * });
 *
 * expensiveCalculation(4); // Logs 'Computing...' and returns 16
 * expensiveCalculation(4); // Returns 16 without logging (cached)
 *
 * @template T - Function type to memoize
 * @param fn - Function to memoize
 * @returns Memoized version of the function
 */
function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map()
  return ((...args: any[]) => {
    const key = JSON.stringify(args)
    if (cache.has(key))
      return cache.get(key)
    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

export default memoize
