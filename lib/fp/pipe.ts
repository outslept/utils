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

export default pipe
