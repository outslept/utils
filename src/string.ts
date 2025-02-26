/**
 * Truncates string with ellipsis
 * @param str - Input string
 * @param maxLength - Maximum length including ellipsis
 * @param ellipsis - Ellipsis character(s)
 */
export function truncate(str: string, maxLength: number, ellipsis = '...'): string {
  if (str.length <= maxLength)
    return str
  return str.slice(0, maxLength - ellipsis.length) + ellipsis
}

/**
 * Pluralizes word based on count
 * @param count - Qunatity
 * @param singular - Singular form
 * @param plural - Plural form (optional)
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  if (count === 1)
    return `${count} ${singular}`
  return `${count} ${plural ?? `${singular}s`}`
}

/**
 * Converts string to camelCase
 * @param str - Input string
 */
export function camelCase(str: string): string {
  return str
    .replace(/[_-]+/g, ' ')
    .replace(/^\w|[A-Z]|\b\w/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase())
    .replace(/\s+/g, '')
}

/**
 * Converts string to kebab-case
 * @param str - Input string
 */
export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

/**
 * Converts string to PascalCase
 * @param str - Input string
 */
export function pascalCase(str: string): string {
  return str
    .replace(/[_-]+/g, ' ')
    .replace(/\w\S*/g, word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
    .replace(/\s+/g, '')
}

/**
 * Converts string to snake_case
 * @param str - Input string
 */
export function snakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase()
}
