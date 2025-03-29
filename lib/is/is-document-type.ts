import isObjectLike from './is-object-like'

/**
 * Checks if a value is a DOM DocumentType.
 * @param value - Value to check
 * @returns True if value is a DOM DocumentType
 */
function isDocumentType(value: unknown): value is DocumentType {
  return isObjectLike(value) && value instanceof DocumentType
}

export default isDocumentType
