import isObjectLike from './is-object-like'

/**
 * Checks if a value is a DOM Element.
 * @param value - Value to check
 * @returns True if value is a DOM Element
 */
function isElement(value: unknown): value is Element {
  return isObjectLike(value) && value instanceof Element
}

export default isElement
