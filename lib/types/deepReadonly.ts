/**
 * Recursively makes all properties of an object readonly.
 *
 * Applies the readonly modifier to all properties at every level of nesting.
 * Prevents modification of the object's properties after initialization.
 *
 * @template T - The input object type
 * @returns Object with all properties marked as readonly at every level
 */
export type DeepReadonly<T> = T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T
