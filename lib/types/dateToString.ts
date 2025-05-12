/**
 * Recursively converts Date properties to string.
 *
 * Traverses the entire object structure, transforming only Date instances.
 *
 * @template T - The input object type
 * @returns Object with all Date properties converted to strings
 */
export type DateToString<T> = T extends Date
  ? string
  : T extends object
    ? { [K in keyof T]: DateToString<T[K]> }
    : T
