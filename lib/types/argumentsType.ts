/**
 * Extracts the argument types of a function type.
 *
 * @example
 * type MyFunction = (a: number, b: string) => void;
 * type Arguments = ArgumentsType<MyFunction>; // [number, string]
 *
 * @template T - The function type to extract arguments from
 * @returns The argument types of the function
 */
export type ArgumentsType<T> = T extends ((...args: infer A) => any) ? A : never
