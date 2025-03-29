import isObjectLike from './is-object-like'

/**
 * Checks if a value is a DOM Document.
 * @param value - Value to check
 * @returns True if value is a DOM Document
 */
function isDocument(value: unknown): value is Document {
  return isObjectLike(value) && value instanceof Document
}

export default isDocument
