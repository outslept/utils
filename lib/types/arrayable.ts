/**
 * Type alias for values that can be converted to an array.
 *
 * @example
 * const arr: Arrayable<number> = 1;
 * const arr: Arrayable<number> = [1, 2, 3];
 *
 * @template T - The type to make arrayable
 */
export type Arrayable<T> = T | Array<T>
