import type { Buffer } from 'node:buffer'
import { toString } from './base'

/**
 * Checks if a value is defined (not undefined).
 *
 * @example
 * isDef(0);        // true
 * isDef(null);     // true
 * isDef(undefined); // false
 *
 * @template T - Type of value when defined
 * @param val - Value to check
 * @returns True if value is not undefined
 */
function isDef<T = any>(val?: T): val is T {
  return typeof val !== 'undefined'
}

/**
 * Checks if a value is undefined.
 *
 * @example
 * isUndef(undefined); // true
 * isUndef(null);      // false
 * isUndef(0);         // false
 *
 * @param val - Value to check
 * @returns True if value is undefined
 */
function isUndef(val: unknown): val is undefined {
  return typeof val === 'undefined'
}

/**
 * Checks if a value is a boolean.
 *
 * @example
 * isBoolean(true);   // true
 * isBoolean(false);  // true
 * isBoolean(0);      // false
 * isBoolean('true'); // false
 *
 * @param val - Value to check
 * @returns True if value is a boolean
 */
function isBoolean(val: unknown): val is boolean {
  return typeof val === 'boolean'
}

/**
 * Checks if a value is a function.
 *
 * @example
 * isFunction(() => {});      // true
 * isFunction(function() {}); // true
 * isFunction(class {});      // true
 * isFunction({});            // false
 *
 * @template T - Function type
 * @param val - Value to check
 * @returns True if value is a function
 */
// eslint-disable-next-line ts/no-unsafe-function-type
function isFunction<T extends Function>(val: unknown): val is T {
  return typeof val === 'function'
}

/**
 * Checks if a value is a number.
 * Excludes NaN values (unlike typeof check).
 *
 * @example
 * isNumber(123);    // true
 * isNumber(1.23);   // true
 * isNumber(NaN);    // false
 * isNumber('123');  // false
 *
 * @param val - Value to check
 * @returns True if value is a number and not NaN
 */
function isNumber(val: unknown): val is number {
  return typeof val === 'number' && !Number.isNaN(val)
}

/**
 * Checks if a value is a string.
 *
 * @example
 * isString('hello');    // true
 * isString('');         // true
 * isString(123);        // false
 * isString(new String('hello')); // false (object, not primitive)
 *
 * @param val - Value to check
 * @returns True if value is a string
 */
function isString(val: unknown): val is string {
  return typeof val === 'string'
}

/**
 * Checks if a value is an object.
 *
 * @example
 * isObject({});         // true
 * isObject(new Object()); // true
 * isObject([]);         // false (array)
 * isObject(null);       // false (null)
 *
 * @param val - Value to check
 * @returns True if value is a plain object
 */
function isObject(val: unknown): val is object {
  return toString(val) === '[object Object]'
}

/**
 * Checks if a value is a plain object (created by {} or new Object()).
 *
 * @example
 * isPlainObject({});         // true
 * isPlainObject(new Object()); // true
 * isPlainObject(Object.create(null)); // true
 * isPlainObject([]);         // false
 * isPlainObject(new Date());  // false
 *
 * @template T - Object type
 * @param val - Value to check
 * @returns True if value is a plain object
 */
function isPlainObject<T extends object = object>(val: unknown): val is T {
  return toString(val) === '[object Object]'
}

/**
 * Checks if a value is an array.
 *
 * @example
 * isArray([1, 2, 3]);  // true
 * isArray([]);         // true
 * isArray({});         // false
 *
 * @template T - Array element type
 * @param val - Value to check
 * @returns True if value is an array
 */
function isArray<T = any>(val: unknown): val is Array<T> {
  return Array.isArray(val)
}

/**
 * Checks if a value is a Map.
 *
 * @example
 * isMap(new Map());  // true
 * isMap({});         // false
 *
 * @template K - Map key type
 * @template V - Map value type
 * @param val - Value to check
 * @returns True if value is a Map
 */
function isMap<K = any, V = any>(val: unknown): val is Map<K, V> {
  return val instanceof Map
}

/**
 * Checks if a value is a Set.
 *
 * @example
 * isSet(new Set());  // true
 * isSet([]);         // false
 *
 * @template T - Set element type
 * @param val - Value to check
 * @returns True if value is a Set
 */
function isSet<T = any>(val: unknown): val is Set<T> {
  return val instanceof Set
}

/**
 * Checks if a value is a valid Date object.
 * Returns false for invalid dates (e.g., new Date('invalid')).
 *
 * @example
 * isDate(new Date());       // true
 * isDate(new Date('2023-01-01')); // true
 * isDate(new Date('invalid')); // false
 * isDate('2023-01-01');     // false
 *
 * @param val - Value to check
 * @returns True if value is a valid Date object
 */
function isDate(val: unknown): val is Date {
  return val instanceof Date && !Number.isNaN(val.getTime())
}

/**
 * Checks if a value is a RegExp.
 *
 * @example
 * isRegExp(/test/);       // true
 * isRegExp(new RegExp('test')); // true
 * isRegExp('/test/');     // false
 *
 * @param val - Value to check
 * @returns True if value is a RegExp
 */
function isRegExp(val: unknown): val is RegExp {
  return val instanceof RegExp
}

/**
 * Checks if a value is a symbol.
 *
 * @example
 * isSymbol(Symbol('test')); // true
 * isSymbol(Symbol.iterator); // true
 * isSymbol('symbol');       // false
 *
 * @param val - Value to check
 * @returns True if value is a symbol
 */
function isSymbol(val: unknown): val is symbol {
  return typeof val === 'symbol'
}

/**
 * Checks if a value is a Promise.
 * Detects both native Promises and Promise-like objects with then/catch methods.
 *
 * @example
 * isPromise(Promise.resolve()); // true
 * isPromise({ then: () => {}, catch: () => {} }); // true
 * isPromise({ then: 'not a function' }); // false
 *
 * @template T - Promise result type
 * @param val - Value to check
 * @returns True if value is a Promise or Promise-like
 */
function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction((val as any).then) && isFunction((val as any).catch)
}

/**
 * Checks if a value is null.
 *
 * @example
 * isNull(null);      // true
 * isNull(undefined); // false
 * isNull(0);         // false
 *
 * @param val - Value to check
 * @returns True if value is null
 */
function isNull(val: unknown): val is null {
  return val === null
}

/**
 * Checks if a value is null or undefined.
 *
 * @example
 * isNullOrUndef(null);      // true
 * isNullOrUndef(undefined); // true
 * isNullOrUndef(0);         // false
 * isNullOrUndef('');        // false
 *
 * @param val - Value to check
 * @returns True if value is null or undefined
 */
function isNullOrUndef(val: unknown): val is null | undefined {
  return isNull(val) || isUndef(val)
}

/**
 * Checks if a value is null, undefined, or empty.
 * For strings: empty or only whitespace
 * For arrays: length of 0
 * For objects: no keys
 * For Map/Set: size of 0
 *
 * @example
 * isNullOrUndefOrEmpty(null);       // true
 * isNullOrUndefOrEmpty(undefined);  // true
 * isNullOrUndefOrEmpty('');         // true
 * isNullOrUndefOrEmpty('   ');      // true
 * isNullOrUndefOrEmpty([]);         // true
 * isNullOrUndefOrEmpty({});         // true
 * isNullOrUndefOrEmpty(new Map());  // true
 * isNullOrUndefOrEmpty('hello');    // false
 * isNullOrUndefOrEmpty([1, 2]);     // false
 *
 * @param val - Value to check
 * @returns True if value is null, undefined, or considered empty
 */
function isNullOrUndefOrEmpty(val: unknown): boolean {
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
 * Checks if a value is an Error object.
 *
 * @example
 * isError(new Error());        // true
 * isError(new TypeError());    // true
 * isError({ message: 'Error' }); // false
 *
 * @param val - Value to check
 * @returns True if value is an Error instance
 */
function isError(val: unknown): val is Error {
  return val instanceof Error
}

/**
 * Checks if a value is a Window object.
 *
 * @example
 * isWindow(window);  // true in browser environment
 * isWindow({});      // false
 *
 * @param val - Value to check
 * @returns True if value is a Window object
 */
function isWindow(val: unknown): val is Window {
  return typeof window !== 'undefined' && toString(val) === '[object Window]'
}

/**
 * Checks if a value is a Document object.
 *
 * @example
 * isDocument(document);  // true in browser environment
 * isDocument({});        // false
 *
 * @param val - Value to check
 * @returns True if value is a Document object
 */
function isDocument(val: unknown): val is Document {
  return typeof document !== 'undefined' && toString(val) === '[object HTMLDocument]'
}

/**
 * Checks if a value is a DOM Element.
 *
 * @example
 * isElement(document.body);           // true in browser environment
 * isElement(document.createElement('div')); // true in browser environment
 * isElement({});                       // false
 *
 * @param val - Value to check
 * @returns True if value is a DOM Element
 */
function isElement(val: unknown): val is Element {
  return val instanceof Element
}

/**
 * Checks if a value is a File object.
 *
 * @example
 * isFile(new File([], 'filename'));  // true in browser environment
 * isFile({});                        // false
 *
 * @param val - Value to check
 * @returns True if value is a File object
 */
function isFile(val: unknown): val is File {
  return toString(val) === '[object File]'
}

/**
 * Checks if a value is a Blob object.
 *
 * @example
 * isBlob(new Blob([]));  // true in browser environment
 * isBlob({});            // false
 *
 * @param val - Value to check
 * @returns True if value is a Blob object
 */
function isBlob(val: unknown): val is Blob {
  return toString(val) === '[object Blob]'
}

/**
 * Checks if a value is a Stream (has a pipe method).
 *
 * @example
 * isStream(fs.createReadStream('file.txt'));  // true in Node.js
 * isStream({ pipe: () => {} });               // true
 * isStream({});                               // false
 *
 * @param val - Value to check
 * @returns True if value has a pipe method
 */
function isStream(val: unknown): boolean {
  return isObject(val) && isFunction((val as any).pipe)
}

/**
 * Checks if a value is a URLSearchParams object.
 *
 * @example
 * isURLSearchParams(new URLSearchParams());  // true
 * isURLSearchParams('key=value');            // false
 *
 * @param val - Value to check
 * @returns True if value is a URLSearchParams object
 */
function isURLSearchParams(val: unknown): val is URLSearchParams {
  return toString(val) === '[object URLSearchParams]'
}

/**
 * Checks if a value is a FormData object.
 *
 * @example
 * isFormData(new FormData());  // true in browser environment
 * isFormData({});              // false
 *
 * @param val - Value to check
 * @returns True if value is a FormData object
 */
function isFormData(val: unknown): val is FormData {
  return toString(val) === '[object FormData]'
}

/**
 * Checks if a value is an ArrayBuffer.
 *
 * @example
 * isArrayBuffer(new ArrayBuffer(8));  // true
 * isArrayBuffer(new Uint8Array(8));   // false
 *
 * @param val - Value to check
 * @returns True if value is an ArrayBuffer
 */
function isArrayBuffer(val: unknown): val is ArrayBuffer {
  return toString(val) === '[object ArrayBuffer]'
}

/**
 * Checks if a value is a Node.js Buffer.
 *
 * @example
 * isBuffer(Buffer.from('test'));  // true in Node.js
 * isBuffer(new Uint8Array(8));    // false
 *
 * @param val - Value to check
 * @returns True if value is a Node.js Buffer
 */
function isBuffer(val: unknown): val is Buffer {
  return val !== null
    && typeof val === 'object'
    && isFunction((val as any).write)
    && isFunction((val as any).fill)
    && isFunction((val as any).toString)
}

/**
 * Checks if a value is a primitive (string, number, boolean, or symbol).
 *
 * @example
 * isPrimitive('hello');      // true
 * isPrimitive(123);          // true
 * isPrimitive(true);         // true
 * isPrimitive(Symbol('x'));  // true
 * isPrimitive({});           // false
 * isPrimitive(null);         // false
 * isPrimitive(undefined);    // false
 *
 * @param val - Value to check
 * @returns True if value is a primitive
 */
function isPrimitive(val: unknown): val is string | number | boolean | symbol {
  return (
    isString(val)
    || isNumber(val)
    || isBoolean(val)
    || isSymbol(val)
  )
}

/**
 * Checks if a value is an empty object (no own properties).
 *
 * @example
 * isEmptyObject({});                // true
 * isEmptyObject(Object.create(null)); // true
 * isEmptyObject({ prop: 'value' });  // false
 * isEmptyObject([]);                 // false (array, not object)
 *
 * @param val - Value to check
 * @returns True if value is an object with no own properties
 */
function isEmptyObject(val: unknown): boolean {
  return isObject(val) && Object.keys(val).length === 0
}

/**
 * Checks if a value is an integer.
 *
 * @example
 * isInteger(42);    // true
 * isInteger(-42);   // true
 * isInteger(42.0);  // true
 * isInteger(42.5);  // false
 * isInteger('42');  // false
 *
 * @param val - Value to check
 * @returns True if value is an integer
 */
function isInteger(val: unknown): val is number {
  return isNumber(val) && Number.isInteger(val)
}

/**
 * Checks if a value is a floating-point number (not an integer).
 *
 * @example
 * isFloat(42.5);   // true
 * isFloat(0.1);    // true
 * isFloat(42);     // false
 * isFloat('42.5'); // false
 *
 * @param val - Value to check
 * @returns True if value is a floating-point number
 */
function isFloat(val: unknown): val is number {
  return isNumber(val) && !Number.isInteger(val)
}

/**
 * Checks if a value is a positive number (greater than zero).
 *
 * @example
 * isPositive(42);    // true
 * isPositive(0.1);   // true
 * isPositive(0);     // false
 * isPositive(-42);   // false
 *
 * @param val - Value to check
 * @returns True if value is a positive number
 */
function isPositive(val: unknown): val is number {
  return isNumber(val) && val > 0
}

/**
 * Checks if a value is a negative number (less than zero).
 *
 * @example
 * isNegative(-42);   // true
 * isNegative(-0.1);  // true
 * isNegative(0);     // false
 * isNegative(42);    // false
 *
 * @param val - Value to check
 * @returns True if value is a negative number
 */
function isNegative(val: unknown): val is number {
  return isNumber(val) && val < 0
}

/**
 * Checks if a string is a valid URL.
 *
 * @example
 * isURL('https://example.com');        // true
 * isURL('http://localhost:3000/path'); // true
 * isURL('not a url');                  // false
 * isURL(123);                          // false
 *
 * @param val - Value to check
 * @returns True if value is a valid URL string
 */
function isURL(val: unknown): boolean {
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
 * Checks if a value is a Date object representing a date in the past.
 *
 * @example
 * isPastDate(new Date('2000-01-01')); // true (assuming current date is after 2000)
 * isPastDate(new Date(Date.now() - 1000)); // true (1 second ago)
 * isPastDate(new Date(Date.now() + 1000)); // false (1 second in future)
 * isPastDate('2000-01-01');           // false (not a Date object)
 *
 * @param val - Value to check
 * @returns True if value is a Date object representing a past date
 */
function isPastDate(val: unknown): boolean {
  return isDate(val) && val < new Date()
}

/**
 * Checks if a value is a Date object representing a date in the future.
 *
 * @example
 * isFutureDate(new Date('2100-01-01')); // true (assuming current date is before 2100)
 * isFutureDate(new Date(Date.now() + 1000)); // true (1 second in future)
 * isFutureDate(new Date(Date.now() - 1000)); // false (1 second ago)
 * isFutureDate('2100-01-01');           // false (not a Date object)
 *
 * @param val - Value to check
 * @returns True if value is a Date object representing a future date
 */
function isFutureDate(val: unknown): boolean {
  return isDate(val) && val > new Date()
}

export {
  isArray,
  isArrayBuffer,
  isBlob,
  isBoolean,
  isBuffer,
  isDate,
  isDef,
  isDocument,
  isElement,
  isEmptyObject,
  isError,
  isFile,
  isFloat,
  isFormData,
  isFunction,
  isFutureDate,
  isInteger,
  isMap,
  isNegative,
  isNull,
  isNullOrUndef,
  isNullOrUndefOrEmpty,
  isNumber,
  isObject,
  isPastDate,
  isPlainObject,
  isPositive,
  isPrimitive,
  isPromise,
  isRegExp,
  isStream,
  isString,
  isURL,
  isURLSearchParams,
  isWindow,
}
