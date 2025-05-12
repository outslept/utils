/**
 * Safely checks if an object has a specific own property.
 * A safer alternative to obj.hasOwnProperty() that handles null/undefined objects.
 *
 * @example
 * hasOwnProperty({ a: 1 }, 'a'); // true
 * hasOwnProperty({ a: 1 }, 'b'); // false
 * hasOwnProperty(null, 'a');     // false
 *
 * @template T - Object type
 * @param obj - Object to check
 * @param v - Property key to check for
 * @returns True if the object has the property as its own property
 */
export function hasOwnProperty<T>(obj: T, v: PropertyKey): boolean {
  if (obj == null) {
    return false
  }

  return Object.hasOwn(obj, v)
}
