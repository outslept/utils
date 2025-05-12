/**
 * Makes specific properties of an object optional.
 *
 * Allows selective application of the optional modifier to specific keys.
 * Combines required and optional properties into a single type.
 *
 * @template T - The input object type
 * @template K - Union of keys to make optional
 * @returns Object with specified properties made optional while others remain required
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
