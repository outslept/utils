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
export function isRecord<K extends string | number | symbol = string, T = unknown>(
  v: unknown,
): v is Record<K, T> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}
