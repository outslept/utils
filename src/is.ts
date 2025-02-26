/* eslint-disable node/prefer-global/buffer */
import { toString } from './base'

/**
 * Checks if value is defined
 * @param val - Value to check
 */
export function isDef<T = any>(val?: T): val is T {
  return typeof val !== 'undefined'
}

/**
 * Checks if value is undefined
 * @param val - Value to check
 */
export function isUndef(val: unknown): val is undefined {
  return typeof val === 'undefined'
}

/**
 * Check if value is boolean
 * @param val - Value to check
 */
export function isBoolean(val: unknown): val is boolean {
  return typeof val === 'boolean'
}

/**
 * Checks if value is function
 * @param val - Value to check
 */
// eslint-disable-next-line ts/no-unsafe-function-type
export function isFunction<T extends Function>(val: unknown): val is T {
  return typeof val === 'function'
}

/**
 * Checks if value is number
 * @param val - Value to check
 */
export function isNumber(val: unknown): val is number {
  return typeof val === 'number' && !Number.isNaN(val)
}

/**
 * Checks if value is string
 * @param val - Value to check
 */
export function isString(val: unknown): val is string {
  return typeof val === 'string'
}

/**
 * Checks if value is object
 * @param val - Value to check
 */
export function isObject(val: unknown): val is object {
  return toString(val) === '[object Object]'
}

/**
 * Checks if value is plain object
 * @param val - Value to check
 */
export function isPlainObject<T extends object = object>(val: unknown): val is T {
  return toString(val) === '[object Object]'
}

/**
 * Checks if value is Array
 * @param val - Value to check
 */
export function isArray<T = any>(val: unknown): val is Array<T> {
  return Array.isArray(val)
}

/**
 * Checks if value is Map
 * @param val - Value to check
 */
export function isMap<K = any, V = any>(val: unknown): val is Map<K, V> {
  return val instanceof Map
}

/**
 * Checks if value is Set
 * @param val - Value to check
 */
export function isSet<T = any>(val: unknown): val is Set<T> {
  return val instanceof Set
}

/**
 * Checks if value is Date
 * @param val - Value to check
 */
export function isDate(val: unknown): val is Date {
  return val instanceof Date && !Number.isNaN(val.getTime())
}

/**
 * Checks if value is RegExp
 * @param val - Value to check
 */
export function isRegExp(val: unknown): val is RegExp {
  return val instanceof RegExp
}

/**
 * Checks if value is symbol
 * @param val - Value to check
 */
export function isSymbol(val: unknown): val is symbol {
  return typeof val === 'symbol'
}

/**
 * Checks if value is Promise
 * @param val - Value to check
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction((val as any).then) && isFunction((val as any).catch)
}

/**
 * Checks if value is null 
 * @param val - Value to check
 */
export function isNull(val: unknown): val is null {
  return val === null
}

/**
 * Checks if value is null or undefined
 * @param val - Value to check
 */
export function isNullOrUndef(val: unknown): val is null | undefined {
  return isNull(val) || isUndef(val)
}

/**
 * Checks if value is null or undefined or empty
 * @param val - Value to check
 */
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

/**
 * Checks if value is Error
 * @param val 
 */
export function isError(val: unknown): val is Error {
  return val instanceof Error
}

/**
 * Checks if value is Window
 * @param val - Value to check
 */
export function isWindow(val: unknown): val is Window {
  return typeof window !== 'undefined' && toString(val) === '[object Window]'
}

/**
 * Checks if value is Document
 * @param val - Value to check
 */
export function isDocument(val: unknown): val is Document {
  return typeof document !== 'undefined' && toString(val) === '[object HTMLDocument]'
}

/**
 * Checks if value is Element
 * @param val - Value to check
 */
export function isElement(val: unknown): val is Element {
  return val instanceof Element
}

/**
 * Checks if value is File
 * @param val - Value to check
 */
export function isFile(val: unknown): val is File {
  return toString(val) === '[object File]'
}

/**
 * Checks if value is Blob
 * @param val - Value to check
 */
export function isBlob(val: unknown): val is Blob {
  return toString(val) === '[object Blob]'
}

/**
 * Checks if value is Stream
 * @param val - Value to check
 */
export function isStream(val: unknown): boolean {
  return isObject(val) && isFunction((val as any).pipe)
}

/**
 * Checks if value is URLSearchParams
 * @param val - Value to check
 */
export function isURLSearchParams(val: unknown): val is URLSearchParams {
  return toString(val) === '[object URLSearchParams]'
}

/**
 * Checks if value is FormData
 * @param val - Value to check
 */
export function isFormData(val: unknown): val is FormData {
  return toString(val) === '[object FormData]'
}

/**
 * Checks if value is ArrayBuffer
 * @param val - Value to check
 */
export function isArrayBuffer(val: unknown): val is ArrayBuffer {
  return toString(val) === '[object ArrayBuffer]'
}

/**
 * Checks if value is Buffer
 * @param val - Value to check
 */
export function isBuffer(val: unknown): val is Buffer {
  return val !== null
    && typeof val === 'object'
    && isFunction((val as any).write)
    && isFunction((val as any).fill)
    && isFunction((val as any).toString)
}

/**
 * Checks if value is primitive
 * @param val - Value to check
 */
export function isPrimitive(val: unknown): val is string | number | boolean | symbol {
  return (
    isString(val)
    || isNumber(val)
    || isBoolean(val)
    || isSymbol(val)
  )
}

/**
 * Checks if value is empty object
 * @param val - Value to check
 */
export function isEmptyObject(val: unknown): boolean {
  return isObject(val) && Object.keys(val).length === 0
}

/**
 * Checks if value is integer
 * @param val - Value to check
 */
export function isInteger(val: unknown): val is number {
  return isNumber(val) && Number.isInteger(val)
}

/**
 * Checks if value is float
 * @param val - Value to check
 */
export function isFloat(val: unknown): val is number {
  return isNumber(val) && !Number.isInteger(val)
}

/**
 * Checks if value is positive
 * @param val - Value to check
 */
export function isPositive(val: unknown): val is number {
  return isNumber(val) && val > 0
}

/**
 * Checks if value is negative
 * @param val - Value to check
 */
export function isNegative(val: unknown): val is number {
  return isNumber(val) && val < 0
}

/**
 * Checks if value is URL
 * @param val - Value to check
 */
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

/**
 * Check if a value is a date in the past
 * @param val - Value to check
 */
export function isPastDate(val: unknown): boolean {
  return isDate(val) && val < new Date()
}

/**
 * Check if a value is a date in future
 * @param val - Value to check
 */
export function isFutureDate(val: unknown): boolean {
  return isDate(val) && val > new Date()
}
