import isArray from "../is/is-array"

/**
 * Creates a type guard for tuples with elements matching specific type guards.
 *
 * @example
 * const isPersonTuple = isTuple([isString, isNumber]); // [name, age]
 * isPersonTuple(['John', 30]);  // true
 * isPersonTuple(['John', '30']); // false (second element not a number)
 * isPersonTuple(['John']);      // false (missing elements)
 *
 * @template T - Array of type guard functions
 * @param guards - Array of type guards, one for each tuple position
 * @returns Type guard function for tuples matching the pattern
 */
export function isTuple<T extends readonly ((v: unknown) => boolean)[]>(
  guards: T,
): (v: unknown) => v is { [K in keyof T]: T[K] extends (v: unknown) => v is infer R ? R : never } {
  return (v: unknown): v is any => {
    return isArray(v) && v.length === guards.length && guards.every((guard, i) => guard(v[i]))
  }
}
