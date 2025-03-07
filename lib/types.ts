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
type CamelCaseKeys<T> = T extends Array<infer U>
  ? Array<CamelCaseKeys<U>>
  : T extends object
    ? {
        [K in keyof T as CamelCaseString<Extract<K, string>>]: CamelCaseKeys<T[K]>;
      }
    : T

/**
 * Recursively makes all properties of an object readonly.
 *
 * Applies the readonly modifier to all properties at every level of nesting.
 * Prevents modification of the object's properties after initialization.
 *
 * @template T - The input object type
 * @returns Object with all properties marked as readonly at every level
 */
type DeepReadonly<T> = T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T

/**
 * Recursively converts Date properties to string.
 *
 * Traverses the entire object structure, transforming only Date instances.
 *
 * @template T - The input object type
 * @returns Object with all Date properties converted to strings
 */
type DateToString<T> = T extends Date
  ? string
  : T extends object
    ? { [K in keyof T]: DateToString<T[K]> }
    : T

/**
 * Recursively removes methods (functions) from an object.
 *
 * Creates a data-only version of an object by filtering out all methods.
 *
 * @template T - The input object type
 * @returns Object with all methods removed at every level
 */
type DeepRemoveMethods<T> = T extends object
  ? {
      [K in keyof T as T[K] extends (...args: any[]) => any ? never : K]: DeepRemoveMethods<
        T[K]
      >;
    }
  : T

/**
 * Recursively converts boolean properties to binary (0 | 1).
 *
 * Transforms all boolean values to numeric representation.
 *
 * @template T - The input object type
 * @returns Object with all boolean properties converted to 0 | 1
 */
type BooleanToBinary<T> = T extends boolean
  ? 0 | 1
  : T extends object
    ? { [K in keyof T]: BooleanToBinary<T[K]> }
    : T

/**
 * Makes specific properties of an object optional.
 *
 * Allows selective application of the optional modifier to specific keys.
 * Combines required and optional properties into a single type.
 *
 * @template T - The input object type
 * @template K - Union of keys to make optional
 * @returns Object with specified properties made optional while others remain required
 */
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * Extracts only the method properties of an object.
 *
 * Creates a new type containing only the function properties from the original object.
 *
 * @template T - The input object type
 * @returns Object type containing only the methods from the original type
 */
type Methods<T> = {
  // eslint-disable-next-line ts/no-unsafe-function-type
  [P in keyof T as T[P] extends Function ? P : never]: T[P];
}

/**
 * Makes specific properties of an object required.
 *
 * Opposite of PartialBy - converts optional properties to required ones.
 * Allows selective application of the required modifier to specific keys.
 *
 * @template T - The input object type
 * @template K - Union of keys to make required
 * @returns Object with specified properties made required while others remain unchanged
 */
type RequiredBy<T, K extends keyof T> = Omit<TemplateStringsArray, K> & Required<Pick<T, K>>

/**
 * Makes all properties of an object nullable.
 *
 * Adds null as a possible value for all properties.
 *
 * @template T - The input object type
 * @returns Object with all properties made nullable (property | null)
 */
type Nullable<T> = { [P in keyof T]: T[P] | null }

/**
 * Flattens nested object types.
 *
 * Creates a shallow copy of the type structure without changing property types.
 *
 * @template T - The input object type
 * @returns Flattened object type with the same structure but simplified type definition
 */
type Flatten<T> = { [K in keyof T]: T[K] }

/**
 * Recursively makes all properties of an object optional.
 *
 * Unlike the standard Partial type, this applies the optional modifier at all levels of nesting.
 *
 * @template T - The input object type
 * @returns Object with all properties at all levels made optional
 */
type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T

/**
 * Recursively makes all properties of an object required.
 *
 * Unlike the standard Required type, this removes the optional modifier at all levels of nesting.
 * Ensures that all properties at every level are present and non-optional.
 *
 * @template T - The input object type
 * @returns Object with all properties at all levels made required
 */
type DeepRequired<T> = T extends object ? { [ P in keyof T ]-?: DeepRequired<T[P]> } : T

/**
 * Type alias for any function.
 *
 * A generic type representing any function with any number of arguments and any return type.
 *
 * @example
 * const functionMap: Record<string, AnyFunction> = {
 *   greet: (name: string) => `Hello ${name}`,
 *   sum: (a: number, b: number) => a + b
 * };
 */
type AnyFunction = (...args: any[]) => any

/**
 * Extracts the type wrapped by a Promise.
 *
 * Unwraps the type parameter from a Promise type.
 *
 * @template T - The input type (potentially a Promise)
 * @returns The unwrapped type if T is a Promise, otherwise T itself
 */
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

/**
 * Creates a partial record with specified key and value types.
 *
 * Similar to Record but with all properties optional.
 *
 * @template K - The property key type (must be a valid object key)
 * @template V - The property value type
 * @returns Partial record mapping keys to values with optional properties
 */
type Lookup<K extends PropertyKey, V> = Partial<Record<K, V>>

export type {
  AnyFunction,
  BooleanToBinary,
  CamelCaseKeys,
  DateToString,
  DeepPartial,
  DeepReadonly,
  DeepRemoveMethods,
  DeepRequired,
  Flatten,
  Lookup,
  Methods,
  Nullable,
  PartialBy,
  RequiredBy,
  UnwrapPromise,
}
