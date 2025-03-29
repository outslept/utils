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

export default compose
