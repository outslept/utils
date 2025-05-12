/**
 * Recursively makes all properties of an object optional.
 *
 * Unlike the standard Partial type, this applies the optional modifier at all levels of nesting.
 *
 * @template T - The input object type
 * @returns Object with all properties at all levels made optional
 */
export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T
