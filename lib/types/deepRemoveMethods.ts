/**
 * Recursively removes methods (functions) from an object.
 *
 * Creates a data-only version of an object by filtering out all methods.
 *
 * @template T - The input object type
 * @returns Object with all methods removed at every level
 */
export type DeepRemoveMethods<T> = T extends object
  ? {
      [K in keyof T as T[K] extends (...args: any[]) => any ? never : K]: DeepRemoveMethods<
        T[K]
      >;
    }
  : T
