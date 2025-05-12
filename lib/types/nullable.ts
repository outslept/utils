/**
 * Makes all properties of an object nullable.
 *
 * Adds null as a possible value for all properties.
 *
 * @template T - The input object type
 * @returns Object with all properties made nullable (property | null)
 */
export type Nullable<T> = { [P in keyof T]: T[P] | null }
