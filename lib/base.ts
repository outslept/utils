/**
 * Asserts that a condition is truthy, throwing an error if it's not.
 *
 * This function is designed to be used as a runtime check with TypeScript's
 * assertion type narrowing, allowing the compiler to understand type constraints
 * after the assertion passes.
 *
 * @example
 * function divide(a: number, b: number): number {
 *   assert(b !== 0, "Cannot divide by zero");
 *   // TypeScript now knows b is not 0
 *   return a / b;
 * }
 *
 * @param condition - Condition to check
 * @param message - Error message to throw if condition is falsy
 * @throws Error with the provided message if condition is falsy
 */
function assert(condition: boolean, message: string): asserts condition {
  if (!condition)
    throw new Error(message)
}

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
const toString = (v: any): string => Object.prototype.toString.call(v)

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
function getTypeName(v: any): string {
  if (v === null)
    return 'null'
  const type = toString(v).slice(8, -1).toLowerCase()
  return (typeof v === 'object' || typeof v === 'function') ? type : typeof v
}

/**
 * No-operation function that does nothing.
 *
 * @example
 * // Using as default callback
 * function fetchData(onComplete = noop) {
 *   // fetch logic...
 *   onComplete();
 * }
 */
function noop(): void {}

export {
  assert,
  getTypeName,
  noop,
  toString,
}
