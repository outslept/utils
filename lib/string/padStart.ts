/**
 * Pads the start of a string to reach the specified length.
 * @param str - The string to pad
 * @param length - Target length
 * @param padChar - Character to pad with
 * @returns Padded string
 */
export function padStart(str: string, length: number, padChar = ' '): string {
  return str.length >= length ? str : padChar.repeat(length - str.length) + str
}
