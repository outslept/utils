/**
 * Converts a string to kebab-case format.
 * @param str - The string to convert
 * @returns The kebab-cased string
 */
export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}
