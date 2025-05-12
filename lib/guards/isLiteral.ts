/**
 * Creates a type guard for a specific literal value.
 *
 * @example
 * const isAdminRole = isLiteral('admin');
 * isAdminRole('admin');  // true
 * isAdminRole('user');   // false
 *
 * @template T - The literal type
 * @param expected - The expected literal value
 * @returns Type guard function for the specific literal value
 */
export function isLiteral<T extends string | number | boolean | null | undefined>(expected: T) {
  return (v: unknown): v is T => v === expected
}
