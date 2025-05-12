/**
 * Flattens nested object types.
 *
 * Creates a shallow copy of the type structure without changing property types.
 *
 * @template T - The input object type
 * @returns Flattened object type with the same structure but simplified type definition
 */
export type Flatten<T> = { [K in keyof T]: T[K] }
