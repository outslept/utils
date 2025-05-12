/**
 * Converts a string to kebab-case format.
 *
 * 1. Split the input string by delimiters
 * 2. Transform each part for kebab-case (first part unchanged, rest capitalized)
 * 3. Join the parts back into a single string
 *
 * @template S - The input string type to transform
 * @returns String in kebab-case format
 */
export type KebabCase<S extends string> = S extends `${infer C}${infer T}`
  ? T extends Uncapitalize<T>
    ? `${Uncapitalize<C>}${KebabCase<T>}`
    : `${Uncapitalize<C>}-${KebabCase<T>}`
  : S;
