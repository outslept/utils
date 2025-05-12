/**
 * Creates a type guard for values that match one of the specified values.
 *
 * @example
 * const isColor = isOneOf(['red', 'green', 'blue'] as const);
 * isColor('red');    // true
 * isColor('yellow'); // false
 *
 * @template T - Array of allowed values
 * @param values - Array of allowed values
 * @returns Type guard function for values in the specified set
 */
export function isOneOf<T extends readonly unknown[]>(
  values: T,
): (v: unknown) => v is T[number] {
  return (v: unknown): v is T[number] => values.includes(v as T[number])
}
