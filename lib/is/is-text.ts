/**
 * Checks if a value is a DOM Text.
 * @param value - Value to check
 * @returns True if value is a DOM Text
 */
function isText(value: unknown): value is Text {
  return value instanceof Text
}

export default isText
