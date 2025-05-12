/**
 * Recursively converts boolean properties to binary (0 | 1).
 *
 * Transforms all boolean values to numeric representation.
 *
 * @template T - The input object type
 * @returns Object with all boolean properties converted to 0 | 1
 */
export type BooleanToBinary<T> = T extends boolean
  ? 0 | 1
  : T extends object
    ? { [K in keyof T]: BooleanToBinary<T[K]> }
    : T
