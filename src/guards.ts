import { getTypeName } from './base'
import { isArray, isString } from './is'

/**
 * Checks if a value is not null or undefined.
 *
 * @example
 * const items = [1, null, 2, undefined].filter(notNullish); // [1, 2]
 *
 * @template T - The type to check
 * @param v - Value to check
 * @returns True if value is neither null nor undefined
 */
function notNullish<T>(v: T | null | undefined): v is NonNullable<T> {
  return v != null
}

/**
 * Checks if a value is not null.
 *
 * @example
 * const items = [1, null, 2].filter(noNull); // [1, 2]
 *
 * @template T - The type to check
 * @param v - Value to check
 * @returns True if value is not null
 */
function noNull<T>(v: T | null): v is Exclude<T, null> {
  return v !== null
}

/**
 * Checks if a value is not undefined.
 *
 * @example
 * const items = [1, undefined, 2].filter(notUndefined); // [1, 2]
 *
 * @template T - The type to check
 * @param v - Value to check
 * @returns True if value is not undefined
 */
function notUndefined<T>(v: T): v is Exclude<T, undefined> {
  return v !== undefined
}

/**
 * Checks if a value is truthy.
 *
 * @example
 * const items = [0, 1, '', 'text', false, true].filter(isTruthy); // [1, 'text', true]
 *
 * @template T - The type to check
 * @param v - Value to check
 * @returns True if value is truthy
 */
function isTruthy<T>(v: T): v is NonNullable<T> {
  return Boolean(v)
}

/**
 * Checks if a value is a non-empty string.
 *
 * @example
 * isNonEmptyString('hello');  // true
 * isNonEmptyString('');       // false
 * isNonEmptyString('   ');    // false (trims whitespace)
 * isNonEmptyString(123);      // false (not a string)
 *
 * @param v - Value to check
 * @returns True if value is a string with non-whitespace content
 */
function isNonEmptyString(v: unknown): v is string {
  return isString(v) && v.trim().length > 0
}

/**
 * Checks if a value is a non-empty array.
 *
 * @example
 * isNonEmptyArray([1, 2, 3]);  // true
 * isNonEmptyArray([]);         // false
 * isNonEmptyArray('array');    // false (not an array)
 *
 * @template T - The element type
 * @param v - Value to check
 * @returns True if value is an array with at least one element
 */
function isNonEmptyArray<T>(v: unknown): v is [T, ...T[]] {
  return isArray(v) && v.length > 0
}

/**
 * Creates a type guard for arrays containing elements of a specific type.
 *
 * @example
 * const isStringArray = isArrayOf(isString);
 * isStringArray(['a', 'b', 'c']);  // true
 * isStringArray(['a', 1, 'c']);    // false (contains non-string)
 *
 * @template T - The element type
 * @param guard - Type guard for individual elements
 * @returns Type guard function for arrays of the specified type
 */
function isArrayOf<T>(guard: (v: unknown) => v is T) {
  return (v: unknown): v is T[] => isArray(v) && v.every(guard)
}

/**
 * Checks if a value is a record (object literal).
 *
 * @example
 * isRecord({ a: 1 });  // true
 * isRecord([1, 2, 3]); // false (array)
 * isRecord(null);      // false (null)
 * isRecord(123);       // false (primitive)
 *
 * @template K - Key type (defaults to string)
 * @template T - Value type (defaults to unknown)
 * @param v - Value to check
 * @returns True if value is a non-null, non-array object
 */
function isRecord<K extends string | number | symbol = string, T = unknown>(
  v: unknown,
): v is Record<K, T> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

/**
 * Creates a type guard for objects with a specific property.
 *
 * @example
 * const hasName = hasProperty('name');
 * hasName({ name: 'John' });  // true
 * hasName({ age: 30 });       // false (missing 'name' property)
 *
 * @template K - Property key type
 * @param key - Property key to check for
 * @returns Type guard function for objects with the specified property
 */
function hasProperty<K extends string | number | symbol>(
  key: K,
): (v: unknown) => v is { [P in K]: unknown } {
  return (v: unknown): v is { [P in K]: unknown } =>
    isRecord(v) && key in v
}

/**
 * Creates a type guard for values that match one of the specified values.
 *
 * @example
 * const isColor = isOneOf(['red', 'green', 'blue'] as const);
 * isColor('red');    // true
 * isColor('yellow'); // false
 *
 * @template T - Array of allowed values
 * @param values - Array of allowed values
 * @returns Type guard function for values in the specified set
 */
function isOneOf<T extends readonly unknown[]>(
  values: T,
): (v: unknown) => v is T[number] {
  return (v: unknown): v is T[number] => values.includes(v as T[number])
}

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
function isTuple<T extends readonly ((v: unknown) => boolean)[]>(
  guards: T,
): (v: unknown) => v is { [K in keyof T]: T[K] extends (v: unknown) => v is infer R ? R : never } {
  return (v: unknown): v is any => {
    return isArray(v) && v.length === guards.length && guards.every((guard, i) => guard(v[i]))
  }
}

/**
 * Creates a type guard for instances of a specific class.
 *
 * @example
 * const isDate = isInstanceOf(Date);
 * isDate(new Date());  // true
 * isDate('2023-01-01'); // false (string, not Date object)
 *
 * @template T - The class type
 * @param constructor - Class constructor
 * @returns Type guard function for instances of the class
 */
function isInstanceOf<T>(constructor: new (...args: any[]) => T) {
  return (value: unknown): value is T => value instanceof constructor
}

/**
 * Asserts that a value satisfies a type guard, throwing an error if it doesn't.
 *
 * @example
 * function processString(s: unknown) {
 *   assertType(s, isString);
 *   // TypeScript now knows s is a string
 *   return s.toUpperCase();
 * }
 *
 * @template T - The expected type
 * @param value - Value to check
 * @param guard - Type guard function
 * @throws TypeError if the value doesn't satisfy the type guard
 */
function assertType<T>(value: unknown, guard: (v: unknown) => v is T): asserts value is T {
  if (!guard(value)) {
    throw new TypeError(`Expected ${getTypeName(value)} to satisfy type guard`)
  }
}

/**
 * Creates a type guard for values that satisfy any of the provided type guards.
 *
 * @example
 * const isStringOrNumber = isUnion(isString, (v): v is number => typeof v === 'number');
 * isStringOrNumber('hello');  // true
 * isStringOrNumber(42);       // true
 * isStringOrNumber(true);     // false
 *
 * @template T - Array of type guard functions
 * @param guards - Type guard functions to check
 * @returns Type guard function that passes if any of the provided guards pass
 */
function isUnion<T extends readonly ((v: unknown) => boolean)[]>(
  ...guards: T
): (v: unknown) => v is ReturnType<T[number]> {
  return (v: unknown): v is any => guards.some(guard => guard(v))
}

/**
 * Creates a type guard for a specific literal value.
 *
 * @example
 * const isAdminRole = isLiteral('admin');
 * isAdminRole('admin');  // true
 * isAdminRole('user');   // false
 *
 * @template T - The literal type
 * @param expected - The expected literal value
 * @returns Type guard function for the specific literal value
 */
function isLiteral<T extends string | number | boolean | null | undefined>(expected: T) {
  return (v: unknown): v is T => v === expected
}

/**
 * Creates a type guard for optional values (value or undefined).
 *
 * @example
 * const isOptionalString = isOptional(isString);
 * isOptionalString('hello');   // true
 * isOptionalString(undefined); // true
 * isOptionalString(null);      // false (null is not undefined)
 * isOptionalString(123);       // false
 *
 * @template T - The base type
 * @param guard - Type guard for the base type
 * @returns Type guard function that accepts either the base type or undefined
 */
function isOptional<T>(guard: (v: unknown) => v is T) {
  return (v: unknown): v is T | undefined => v === undefined || guard(v)
}

export {
  assertType,
  hasProperty,
  isArrayOf,
  isInstanceOf,
  isLiteral,
  isNonEmptyArray,
  isNonEmptyString,
  isOneOf,
  isOptional,
  isRecord,
  isTruthy,
  isTuple,
  isUnion,
  noNull,
  notNullish,
  notUndefined,
}
