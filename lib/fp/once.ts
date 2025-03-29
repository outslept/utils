/**
 * Creates a function that executes only once, regardless of how many times it's called.
 *
 * The first call's result is cached and returned for all subsequent calls.
 *
 * @example
 * const initialize = once(() => {
 *   console.log('Initializing...');
 *   return { ready: true };
 * });
 *
 * initialize(); // Logs 'Initializing...' and returns { ready: true }
 * initialize(); // Just returns { ready: true } without logging
 *
 * @template T - Function type to wrap
 * @param fn - Function to execute only once
 * @returns Function that will only execute its wrapped function once
 */
function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false
  let result: ReturnType<T>

  return ((...args: Parameters<T>) => {
    if (!called) {
      called = true
      result = fn(...args)
    }
    return result
  }) as T
}

export default once
