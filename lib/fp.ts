/**
 * Creates a new function that applies a sequence of transformations from left to right.
 *
 * Each function in the pipeline receives the output of the previous function.
 * The first function receives the initial input value.
 *
 * @example
 * const addOne = (x: number) => x + 1;
 * const double = (x: number) => x * 2;
 * const square = (x: number) => x * x;
 *
 * const transform = pipe(addOne, double, square);
 * transform(3); // ((3 + 1) * 2)² = 64
 *
 * @template T - Type of value being transformed
 * @param fns - Series of transformation functions to apply in sequence
 * @returns Function that applies all transformations from left to right
 */
function pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return arg => fns.reduce((result, fn) => fn(result), arg)
}

/**
 * Creates a new function that applies a sequence of transformations from right to left.
 *
 * Similar to pipe, but functions are applied in reverse order.
 *
 * @example
 * const addOne = (x: number) => x + 1;
 * const double = (x: number) => x * 2;
 * const square = (x: number) => x * x;
 *
 * const transform = compose(square, double, addOne);
 * transform(3); // ((3 + 1) * 2)² = 64
 *
 * @template T - Type of value being transformed
 * @param fns - Series of transformation functions to apply in reverse sequence
 * @returns Function that applies all transformations from right to left
 */
function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return arg => fns.reduceRight((result, fn) => fn(result), arg)
}

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

/**
 * Transforms a function to allow partial application of its arguments.
 *
 * Creates a function that can be called with fewer arguments than required,
 * returning a new function that accepts the remaining arguments.
 *
 * @example
 * const add = (a: number, b: number, c: number) => a + b + c;
 * const curriedAdd = curry(add);
 *
 * curriedAdd(1, 2, 3); // 6
 * curriedAdd(1)(2, 3); // 6
 * curriedAdd(1, 2)(3); // 6
 * curriedAdd(1)(2)(3); // 6
 *
 * @template T - Function type to curry
 * @param fn - Function to transform
 * @returns Curried version of the function
 */
function curry<T extends (...args: any[]) => any>(
  fn: T,
): (...args: Parameters<T>) => ReturnType<T> {
  return function curried(...args: any[]): any {
    if (args.length >= fn.length) {
      return fn(...args)
    }
    return (...nextArgs: any[]) => curried(...args, ...nextArgs)
  }
}

export {
  compose,
  curry,
  memoize,
  once,
  pipe,
}
