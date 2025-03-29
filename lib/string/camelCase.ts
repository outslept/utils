/**
 * Converts a string to camelCase format.
 * @param str - The string to convert
 * @returns The camelCased string
 */
export function camelCase(str: string): string {
  return str
    .replace(/[_-]+/g, ' ')
    .replace(/^\w|[A-Z]|\b\w/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase())
    .replace(/\s+/g, '')
}
