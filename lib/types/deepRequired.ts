/**
 * Recursively makes all properties of an object required.
 *
 * Unlike the standard Required type, this removes the optional modifier at all levels of nesting.
 * Ensures that all properties at every level are present and non-optional.
 *
 * @template T - The input object type
 * @returns Object with all properties at all levels made required
 */
export type DeepRequired<T> = T extends object ? { [ P in keyof T ]-?: DeepRequired<T[P]> } : T
