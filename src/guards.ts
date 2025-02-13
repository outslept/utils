import { isArray, isString } from './is'

export function notNullish<T>(v: T | null | undefined): v is NonNullable<T> {
  return v != null
}

export function noNull<T>(v: T | null): v is Exclude<T, null> {
  return v !== null
}

export function notUndefined<T>(v: T): v is Exclude<T, undefined> {
  return v !== undefined
}

export function isTruthy<T>(v: T): v is NonNullable<T> {
  return Boolean(v)
}

export function isNonEmptyString(v: unknown): v is string {
  return isString(v) && v.trim().length > 0
}

export function isNonEmptyArray<T>(v: unknown): v is [T, ...T[]] {
  return isArray(v) && v.length > 0
}

export function isArrayOf<T>(guard: (v: unknown) => v is T) {
  return (v: unknown): v is T[] => isArray(v) && v.every(guard)
}

export function isRecord<K extends string | number | symbol = string, T = unknown>(
  v: unknown,
): v is Record<K, T> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

export function hasProperty<K extends string | number | symbol>(
  key: K,
): (v: unknown) => v is { [P in K]: unknown } {
  return (v: unknown): v is { [P in K]: unknown } =>
    isRecord(v) && key in v
}

export function isOneOf<T extends readonly unknown[]>(
  values: T,
): (v: unknown) => v is T[number] {
  return (v: unknown): v is T[number] => values.includes(v as T[number])
}

export function isTuple<T extends readonly ((v: unknown) => boolean)[]>(
  guards: T,
): (v: unknown) => v is { [K in keyof T]: T[K] extends (v: unknown) => v is infer R ? R : never } {
  return (v: unknown): v is any => {
    return isArray(v) && v.length === guards.length && guards.every((guard, i) => guard(v[i]))
  }
}
