/**
 * Extracts the type wrapped by a Promise.
 *
 * Unwraps the type parameter from a Promise type.
 *
 * @template T - The input type (potentially a Promise)
 * @returns The unwrapped type if T is a Promise, otherwise T itself
 */
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
