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

export default curry
