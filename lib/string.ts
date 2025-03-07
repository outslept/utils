/**
 * Truncates a string with ellipsis if it exceeds the maximum length.
 *
 * @example
 * truncate("Hello world", 8);        // "Hello..."
 * truncate("Hello world", 8, "…");    // "Hello…"
 * truncate("Hello", 10);             // "Hello" (no truncation needed)
 *
 * @param str - Input string to truncate
 * @param maxLength - Maximum length of the result string including ellipsis
 * @param ellipsis - Ellipsis character(s) to append (default: '...')
 * @returns Truncated string with ellipsis if needed, or original string if short enough
 */
function truncate(str: string, maxLength: number, ellipsis = '...'): string {
  if (str.length <= maxLength)
    return str
  return str.slice(0, maxLength - ellipsis.length) + ellipsis
}

/**
 * Creates a plural phrase based on count.
 *
 * @example
 * pluralize(1, "apple");           // "1 apple"
 * pluralize(2, "apple");           // "2 apples"
 * pluralize(3, "child", "children"); // "3 children"
 *
 * @param count - Quantity to determine pluralization
 * @param singular - Singular form of the word
 * @param plural - Custom plural form (optional, defaults to singular + 's')
 * @returns Formatted string with count and appropriate word form
 */
function pluralize(count: number, singular: string, plural?: string): string {
  if (count === 1)
    return `${count} ${singular}`
  return `${count} ${plural ?? `${singular}s`}`
}

/**
 * Converts a string to camelCase format.
 *
 * Handles various input formats including spaces, hyphens, underscores,
 * and mixed case strings.
 *
 * @example
 * camelCase("hello world");    // "helloWorld"
 * camelCase("hello-world");    // "helloWorld"
 * camelCase("hello_world");    // "helloWorld"
 * camelCase("Hello World");    // "helloWorld"
 *
 * @param str - Input string to convert
 * @returns String in camelCase format
 */
function camelCase(str: string): string {
  return str
    .replace(/[_-]+/g, ' ')
    .replace(/^\w|[A-Z]|\b\w/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase())
    .replace(/\s+/g, '')
}

/**
 * Converts a string to kebab-case format.
 *
 * Transforms various input formats by replacing spaces with hyphens
 * and separating camelCase words with hyphens.
 *
 * @example
 * kebabCase("hello world");    // "hello-world"
 * kebabCase("helloWorld");     // "hello-world"
 * kebabCase("hello_world");    // "hello-world"
 *
 * @param str - Input string to convert
 * @returns String in kebab-case format
 */
function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

/**
 * Converts a string to PascalCase format.
 *
 * Capitalizes the first letter of each word and removes spaces,
 * hyphens, and underscores.
 *
 * @example
 * pascalCase("hello world");    // "HelloWorld"
 * pascalCase("hello-world");    // "HelloWorld"
 * pascalCase("hello_world");    // "HelloWorld"
 *
 * @param str - Input string to convert
 * @returns String in PascalCase format
 */
function pascalCase(str: string): string {
  return str
    .replace(/[_-]+/g, ' ')
    .replace(/\w\S*/g, word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
    .replace(/\s+/g, '')
}

/**
 * Converts a string to snake_case format.
 *
 * Transforms various input formats by replacing spaces and hyphens with underscores
 * and separating camelCase words with underscores.
 *
 * @example
 * snakeCase("hello world");    // "hello_world"
 * snakeCase("helloWorld");     // "hello_world"
 * snakeCase("hello-world");    // "hello_world"
 *
 * @param str - Input string to convert
 * @returns String in snake_case format
 */
function snakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase()
}

/**
 * Capitalizes the first letter of a string.
 *
 * @example
 * capitalize("hello");    // "Hello"
 * capitalize("HELLO");    // "HELLO" (only first letter is affected)
 * capitalize("");         // "" (empty string returned as is)
 *
 * @param str - Input string to capitalize
 * @returns String with first letter capitalized
 */
function capitalize(str: string): string {
  if (!str)
    return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Counts the number of words in a string.
 *
 * Words are considered to be separated by one or more whitespace characters.
 * Leading and trailing whitespace is ignored.
 *
 * @example
 * countWords("hello world");      // 2
 * countWords("  hello   world  "); // 2
 * countWords("");                  // 0
 *
 * @param str - Input string to count words in
 * @returns Number of words in the string
 */
function countWords(str: string): number {
  return str.trim().split(/\s+/).length
}

export {
  camelCase,
  capitalize,
  countWords,
  kebabCase,
  pascalCase,
  pluralize,
  snakeCase,
  truncate,
}
