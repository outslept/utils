/**
 * Converts a string to snake_case format.
 *
 * 1. Split the input string by delimiters
 * 2. Transform each part for snake_case (first part unchanged, rest lowercase)
 * 3. Join the parts back into a single string
 *
 * @template S - The input string type to transform
 * @returns String in snake_case format
 */
export type SnakeCase<S extends string> = S extends `${infer C}${infer T}`
  ? T extends Uncapitalize<T>
    ? `${Uncapitalize<C>}${SnakeCase<T>}`
    : `${Uncapitalize<C>}_${SnakeCase<T>}`
  : S
