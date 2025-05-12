/**
 * Creates a partial record with specified key and value types.
 *
 * Similar to Record but with all properties optional.
 *
 * @template K - The property key type (must be a valid object key)
 * @template V - The property value type
 * @returns Partial record mapping keys to values with optional properties
 */
export type Lookup<K extends PropertyKey, V> = Partial<Record<K, V>>
