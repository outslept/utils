import isObjectLike from './is-object-like'

/**
 * Checks if a value is a DOM Comment.
 * @param value - Value to check
 * @returns True if value is a DOM Comment
 */
function isComment(value: unknown): value is Comment {
  return isObjectLike(value) && value instanceof Comment
}

export default isComment
