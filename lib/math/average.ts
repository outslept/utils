import { sum } from './sum'

/**
 * Calculates the average of numbers.
 * @param numbers - Numbers to average
 * @returns Average of numbers
 */
export function average(...numbers: number[]): number {
  if (numbers.length === 0)
    return Number.NaN
  return sum(...numbers) / numbers.length
}
