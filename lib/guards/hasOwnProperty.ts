import { isRecord } from "./isRecord";

/**
 * Creates a type guard for objects with a specific property.
 *
 * @example
 * const hasName = hasProperty('name');
 * hasName({ name: 'John' });  // true
 * hasName({ age: 30 });       // false (missing 'name' property)
 *
 * @template K - Property key type
 * @param key - Property key to check for
 * @returns Type guard function for objects with the specified property
 */
export function hasProperty<K extends string | number | symbol>(
  key: K,
): (v: unknown) => v is { [P in K]: unknown } {
  return (v: unknown): v is { [P in K]: unknown } =>
    isRecord(v) && key in v
}
