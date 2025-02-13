/* eslint-disable node/prefer-global/buffer */
import { toString } from './base'

export function isDef<T = any>(val?: T): val is T {
  return typeof val !== 'undefined'
}

export function isUndef(val: unknown): val is undefined {
  return typeof val === 'undefined'
}

export function isBoolean(val: unknown): val is boolean {
  return typeof val === 'boolean'
}

// eslint-disable-next-line ts/no-unsafe-function-type
export function isFunction<T extends Function>(val: unknown): val is T {
  return typeof val === 'function'
}

export function isNumber(val: unknown): val is number {
  return typeof val === 'number' && !Number.isNaN(val)
}

export function isString(val: unknown): val is string {
  return typeof val === 'string'
}

export function isObject(val: unknown): val is object {
  return toString(val) === '[object Object]'
}

export function isPlainObject<T extends object = object>(val: unknown): val is T {
  return toString(val) === '[object Object]'
}

export function isArray<T = any>(val: unknown): val is Array<T> {
  return Array.isArray(val)
}

export function isMap<K = any, V = any>(val: unknown): val is Map<K, V> {
  return val instanceof Map
}

export function isSet<T = any>(val: unknown): val is Set<T> {
  return val instanceof Set
}

export function isDate(val: unknown): val is Date {
  return val instanceof Date && !Number.isNaN(val.getTime())
}

export function isRegExp(val: unknown): val is RegExp {
  return val instanceof RegExp
}

export function isSymbol(val: unknown): val is symbol {
  return typeof val === 'symbol'
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction((val as any).then) && isFunction((val as any).catch)
}

export function isNull(val: unknown): val is null {
  return val === null
}

export function isNullOrUndef(val: unknown): val is null | undefined {
  return isNull(val) || isUndef(val)
}

export function isNullOrUndefOrEmpty(val: unknown): boolean {
  if (isNullOrUndef(val))
    return true
  if (isString(val))
    return val.trim().length === 0
  if (isArray(val))
    return val.length === 0
  if (isMap(val) || isSet(val))
    return val.size === 0
  if (isObject(val))
    return Object.keys(val).length === 0
  return false
}

export function isError(val: unknown): val is Error {
  return val instanceof Error
}

export function isWindow(val: unknown): val is Window {
  return typeof window !== 'undefined' && toString(val) === '[object Window]'
}

export function isDocument(val: unknown): val is Document {
  return typeof document !== 'undefined' && toString(val) === '[object HTMLDocument]'
}

export function isElement(val: unknown): val is Element {
  return val instanceof Element
}

export function isFile(val: unknown): val is File {
  return toString(val) === '[object File]'
}

export function isBlob(val: unknown): val is Blob {
  return toString(val) === '[object Blob]'
}

export function isStream(val: unknown): boolean {
  return isObject(val) && isFunction((val as any).pipe)
}

export function isURLSearchParams(val: unknown): val is URLSearchParams {
  return toString(val) === '[object URLSearchParams]'
}

export function isFormData(val: unknown): val is FormData {
  return toString(val) === '[object FormData]'
}

export function isArrayBuffer(val: unknown): val is ArrayBuffer {
  return toString(val) === '[object ArrayBuffer]'
}

export function isBuffer(val: unknown): val is Buffer {
  return val !== null
    && typeof val === 'object'
    && isFunction((val as any).write)
    && isFunction((val as any).fill)
    && isFunction((val as any).toString)
}

export function isPrimitive(val: unknown): val is string | number | boolean | symbol {
  return (
    isString(val)
    || isNumber(val)
    || isBoolean(val)
    || isSymbol(val)
  )
}

export function isEmptyObject(val: unknown): boolean {
  return isObject(val) && Object.keys(val).length === 0
}

export function isInteger(val: unknown): val is number {
  return isNumber(val) && Number.isInteger(val)
}

export function isFloat(val: unknown): val is number {
  return isNumber(val) && !Number.isInteger(val)
}

export function isPositive(val: unknown): val is number {
  return isNumber(val) && val > 0
}

export function isNegative(val: unknown): val is number {
  return isNumber(val) && val < 0
}

export function isURL(val: unknown): boolean {
  if (!isString(val))
    return false
  try {
    // eslint-disable-next-line no-new
    new URL(val)
    return true
  }
  catch {
    return false
  }
}
