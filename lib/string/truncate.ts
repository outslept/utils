/**
 * Truncates a string to a maximum length, adding an ellipsis if needed.
 * @param str - The string to truncate
 * @param maxLength - Maximum length of the result string
 * @param ellipsis - The ellipsis to add
 * @returns The truncated string
 */
export function truncate(str: string, maxLength: number, ellipsis = '...'): string {
  if (str.length <= maxLength)
    return str
  return str.slice(0, maxLength - ellipsis.length) + ellipsis
}
