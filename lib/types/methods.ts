/**
 * Extracts only the method properties of an object.
 *
 * Creates a new type containing only the function properties from the original object.
 *
 * @template T - The input object type
 * @returns Object type containing only the methods from the original type
 */
export type Methods<T> = {
  // eslint-disable-next-line ts/no-unsafe-function-type
  [P in keyof T as T[P] extends Function ? P : never]: T[P];
}
