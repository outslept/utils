/**
 * Returns the string representation of a value using Object.prototype.toString.
 *
 * @example
 * toString(new Date());    // "[object Date]"
 * toString([1, 2, 3]);     // "[object Array]"
 * toString(null);          // "[object Null]"
 * toString(undefined);     // "[object Undefined]"
 *
 * @param v - Value to convert to string representation
 * @returns String representation in the format "[object Type]"
 */
export const toString = (v: any): string => Object.prototype.toString.call(v)
