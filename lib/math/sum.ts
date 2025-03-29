/**
 * Calculates the sum of numbers.
 * @param numbers - Numbers to sum
 * @returns Sum of numbers
 */
export function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0)
}
