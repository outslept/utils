/**
 * Type alias for values that can be awaited.
 *
 * @example
 * const promise: Awaitable<number> = Promise.resolve(1);
 * const promise: Awaitable<number> = new Promise((resolve) => resolve(1));
 *
 * @template T - The type to make awaitable
 */
export type Awaitable<T> = T | PromiseLike<T>
