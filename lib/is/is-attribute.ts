import isObjectLike from './is-object-like'

/**
 * Checks if a value is a DOM Attr.
 * @param value - Value to check
 * @returns True if value is a DOM Attr
 */
function isAttribute(value: unknown): value is Attr {
  return isObjectLike(value) && value instanceof Attr
}

export default isAttribute
