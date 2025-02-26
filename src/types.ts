// Utility type to split a string by delimiters (_ or -) into an array of parts
type SplitByDelimiters<S extends string> =
  S extends `${infer Part}_${infer Rest}` ? [Part, ...SplitByDelimiters<Rest>] :
    S extends `${infer Part}-${infer Rest}` ? [Part, ...SplitByDelimiters<Rest>] :
        [S]

// Utility type to convert an array of string parts into camelCase format
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

// Utility type to join an array of string parts into a single string
type Join<Parts extends string[]> = Parts extends [infer First, ...infer Rest]
  ? `${First extends string ? First : ''}${Join<Rest extends string[] ? Rest : []>}`
  : ''

// Utility type to convert a string to camelCase format
type CamelCaseString<S extends string> = Join<
  CamelCaseParts<SplitByDelimiters<S>>
>

// Utility type to recursively convert object keys to camelCase format
type CamelCaseKeys<T> = T extends Array<infer U>
  ? Array<CamelCaseKeys<U>>
  : T extends object
    ? {
        [K in keyof T as CamelCaseString<Extract<K, string>>]: CamelCaseKeys<T[K]>;
      }
    : T

// Utility type to recursively make all properties of an object readonly
type DeepReadonly<T> = T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T

// Utility type to recursively convert Date properties to string
type DateToString<T> = T extends Date
  ? string
  : T extends object
    ? { [K in keyof T]: DateToString<T[K]> }
    : T

// Utility type to recursively remove methods (functions) from an object
type DeepRemoveMethods<T> = T extends object
  ? {
      [K in keyof T as T[K] extends (...args: any[]) => any ? never : K]: DeepRemoveMethods<
        T[K]
      >;
    }
  : T

// Utility type to recursively convert boolean properties to binary (0 | 1)
type BooleanToBinary<T> = T extends boolean
  ? 0 | 1
  : T extends object
    ? { [K in keyof T]: BooleanToBinary<T[K]> }
    : T

// Utility type to make specific properties optional
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// Utility type to extract only the methods of an object
type Methods<T> = {
  // eslint-disable-next-line ts/no-unsafe-function-type
  [P in keyof T as T[P] extends Function ? P : never]: T[P];
}

export type {
  BooleanToBinary,
  CamelCaseKeys,
  DateToString,
  DeepReadonly,
  DeepRemoveMethods,
  Methods,
  PartialBy,
}
