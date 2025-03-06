import { getTypeName } from './base'
import { isArray, isString } from './is'

/**
 * Checks if value is not null or undefined
 * @param v - Value to check
 */
function notNullish<T>(v: T | null | undefined): v is NonNullable<T> {
  return v != null
}

/**
 * Checks if value is not null
 * @param v - Value to check
 */
function noNull<T>(v: T | null): v is Exclude<T, null> {
  return v !== null
}

/**
 * Checks if value is not undefined
 * @param v - Value to check
 */
function notUndefined<T>(v: T): v is Exclude<T, undefined> {
  return v !== undefined
}

/**
 * Checks if value is truthy
 * @param v - Value to check
 */
function isTruthy<T>(v: T): v is NonNullable<T> {
  return Boolean(v)
}

/**
 * Checks if value is non-empty string
 * @param v - Value to check
 */
function isNonEmptyString(v: unknown): v is string {
  return isString(v) && v.trim().length > 0
}

/**
 * Checks if value is non-empty array
 * @param v - Value to check
 */
function isNonEmptyArray<T>(v: unknown): v is [T, ...T[]] {
  return isArray(v) && v.length > 0
}

/**
 * Checks if value is array of specified type
 * @param guard - Guard function
 */
function isArrayOf<T>(guard: (v: unknown) => v is T) {
  return (v: unknown): v is T[] => isArray(v) && v.every(guard)
}

/**
 * Checks if value is record
 * @param v - Value to check
 */
function isRecord<K extends string | number | symbol = string, T = unknown>(
  v: unknown,
): v is Record<K, T> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

/**
 * Checks if value has property
 * @param key - Property key
 */
function hasProperty<K extends string | number | symbol>(
  key: K,
): (v: unknown) => v is { [P in K]: unknown } {
  return (v: unknown): v is { [P in K]: unknown } =>
    isRecord(v) && key in v
}

/**
 * Checks if value is one of specified values
 * @param values - Values to check
 */
function isOneOf<T extends readonly unknown[]>(
  values: T,
): (v: unknown) => v is T[number] {
  return (v: unknown): v is T[number] => values.includes(v as T[number])
}

/**
 * Checks if value is tuple of specified guards
 * @param guards - Guards to check
 */
function isTuple<T extends readonly ((v: unknown) => boolean)[]>(
  guards: T,
): (v: unknown) => v is { [K in keyof T]: T[K] extends (v: unknown) => v is infer R ? R : never } {
  return (v: unknown): v is any => {
    return isArray(v) && v.length === guards.length && guards.every((guard, i) => guard(v[i]))
  }
}

/**
 * Checks if value is instance of specified constructor
 * @param constructor - Constructor to check
 */
function isInstanceOf<T>(constructor: new (...args: any[]) => T) {
  return (value: unknown): value is T => value instanceof constructor
}

/**
 * Asserts value satisfies type guard
 * @param value - Value to assert
 */
function assertType<T>(value: unknown, guard: (v: unknown) => v is T): asserts value is T {
  if (!guard(value)) {
    throw new TypeError(`Expected ${getTypeName(value)} to satisfy type guard`)
  }
}

/**
 * Checks if value satisfies any of the provided type guards
 * @param guards - Guards to check
 */
function isUnion<T extends readonly ((v: unknown) => boolean)[]>(
  ...guards: T
): (v: unknown) => v is ReturnType<T[number]> {
  return (v: unknown): v is any => guards.some(guard => guard(v))
}

/**
 * Checks if a value is a literal
 * @param expected - Expected
 */
function isLiteral<T extends string | number | boolean | null | undefined>(expected: T) {
  return (v: unknown): v is T => v === expected
}

/**
 * Checks if a value is optional
 * @param guard - Guard to check
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
