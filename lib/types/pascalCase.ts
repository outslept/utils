/**
 * Converts a string to PascalCase format.
 *
 * 1. Split the input string by delimiters
 * 2. Transform each part for PascalCase (first part unchanged, rest capitalized)
 * 3. Join the parts back into a single string
 *
 * @template S - The input string type to transform
 * @returns String in PascalCase format
 */
export type PascalCase<S extends string> = S extends `${infer F}_${infer R}`
  ? `${Capitalize<F>}${PascalCase<R>}`
  : Capitalize<S>
