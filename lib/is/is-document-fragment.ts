import isObjectLike from './is-object-like'

/**
 * Checks if a value is a DOM DocumentFragment.
 * @param value - Value to check
 * @returns True if value is a DOM DocumentFragment
 */
function isDocumentFragment(value: unknown): value is DocumentFragment {
  return isObjectLike(value) && value instanceof DocumentFragment
}

export default isDocumentFragment
