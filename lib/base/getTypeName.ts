import { toString } from './toString'

/**
 * Returns a normalized type name of a value.
 *
 * @example
 * getTypeName(null);           // "null"
 * getTypeName(undefined);      // "undefined"
 * getTypeName(123);            // "number"
 * getTypeName("hello");        // "string"
 * getTypeName(new Date());     // "date"
 * getTypeName([1, 2, 3]);      // "array"
 * getTypeName({});             // "object"
 * getTypeName(() => {});       // "function"
 *
 * @param v - Value to get type name of
 * @returns Lowercase string representing the value's type
 */
export function getTypeName(v: any): string {
  if (v === null)
    return 'null'
  const type = toString(v).slice(8, -1).toLowerCase()
  return (typeof v === 'object' || typeof v === 'function') ? type : typeof v
}
