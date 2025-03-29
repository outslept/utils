/**
 * Counts the number of words in a string.
 * @param str - The string to count words in
 * @returns The number of words
 */
export function countWords(str: string): number {
  return str.trim().split(/\s+/).length
}
