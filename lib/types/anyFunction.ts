/**
 * Type alias for any function.
 *
 * A generic type representing any function with any number of arguments and any return type.
 *
 * @example
 * const functionMap: Record<string, AnyFunction> = {
 *   greet: (name: string) => `Hello ${name}`,
 *   sum: (a: number, b: number) => a + b
 * };
 */
export type AnyFunction = (...args: any[]) => any
