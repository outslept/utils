/**
 * Splits a string by underscore or hyphen delimiters into an array of parts.
 *
 * This recursive type processes the string character by character:
 * 1. It checks if string contains an _ (underscore) delimiter
 * 2. If not, checks for - (hypen) delimiter
 * 3. If no delimiters are found, returns the string as a single-element array
 *
 * @template S - The input string type to split
 * @returns Array of string parts split by delimiters
 */
type SplitByDelimiters<S extends string> =
  S extends `${infer Part}_${infer Rest}` ? [Part, ...SplitByDelimiters<Rest>] :
    S extends `${infer Part}-${infer Rest}` ? [Part, ...SplitByDelimiters<Rest>] :
        [S]

/**
 * Converts an array of string parts into camelCase format parts.
 *
 * The first part remains unchanged while all subsequent parts are capitalized.
 * This craetes the fcomponent needed for camelCase formatting.
 *
 * @template Parts - Array of strings parts to transform
 * @returns Array with first item unchanged and all subsequent items capitalized
 */
type CamelCaseParts<Parts extends string[]> = Parts extends [
  infer First,
  ...infer Rest,
]
  ? First extends string
    ? Rest extends string[]
      ? [First, ...{ [I in keyof Rest]: Rest[I] extends string ? Capitalize<Rest[I]> : never }]
      : never
    : never
  : []

/**
 * Joins an array of string parts into a single string.
 *
 * Recursively concatenates all elements of the array into one string without any separators.
 * Used to combine camelCase parts after transformation.
 *
 * @template Parts - Array of string parts to join
 * @returns Concatenated string with no separators
 */
type Join<Parts extends string[]> = Parts extends [infer First, ...infer Rest]
  ? `${First extends string ? First : ''}${Join<Rest extends string[] ? Rest : []>}`
  : ''

/**
 * Converts a string to camelCase format.
 *
 * Combines t he 3 utility types above to create a type that converts a string to camelCase format.
 *
 * The process is as follows:
 * 1. Split the input string by delimiters
 * 2. Transform each part for camelCase (first part unchanged, rest capitalized)
 * 3. Join the parts back into a single string
 *
 * @template S - The input string type to transform
 * @returns String in camelCase format
 */
type CamelCaseString<S extends string> = Join<
  CamelCaseParts<SplitByDelimiters<S>>
>

/**
 * Recursively converts all object keys to camelCase format.
 *
 * Handles nested objects and arrays by:
 * 1. Processing arrays by applying the transformation to each element
 * 2. Processing objects by transforming each key to camelCase
 * 3. Recursively applying the transformation to nested values
 * 4. Leaving primitive values unchanged
 *
 * @template T - The input object type
 * @returns Object with all keys transformed to camelCase at every level
 */
export type CamelCaseKeys<T> = T extends Array<infer U>
  ? Array<CamelCaseKeys<U>>
  : T extends object
    ? {
        [K in keyof T as CamelCaseString<Extract<K, string>>]: CamelCaseKeys<T[K]>;
      }
    : T
