/**
 * Makes specific properties of an object required.
 *
 * Opposite of PartialBy - converts optional properties to required ones.
 * Allows selective application of the required modifier to specific keys.
 *
 * @template T - The input object type
 * @template K - Union of keys to make required
 * @returns Object with specified properties made required while others remain unchanged
 */
export type RequiredBy<T, K extends keyof T> = Omit<TemplateStringsArray, K> & Required<Pick<T, K>>
