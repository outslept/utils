/**
 * Formats a count with singular or plural form of a word.
 * @param count - The count
 * @param singular - Singular form of the word
 * @param plural - Plural form of the word (defaults to singular + 's')
 * @returns Formatted string with count and word
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  if (count === 1)
    return `${count} ${singular}`
  return `${count} ${plural ?? `${singular}s`}`
}
