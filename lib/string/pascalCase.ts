/**
 * Converts a string to PascalCase format.
 * @param str - The string to convert
 * @returns The PascalCased string
 */
export function pascalCase(str: string): string {
  return str
    .replace(/[_-]+/g, ' ')
    .replace(/\w\S*/g, word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
    .replace(/\s+/g, '')
}
