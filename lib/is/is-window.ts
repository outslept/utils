import getTag from '../../helpers/getTag'

/**
 * Checks if a value is a Window object.
 * @param value - Value to check
 * @returns True if value is a Window object
 */
function isWindow(value: unknown): value is Window {
  return typeof window !== 'undefined' && getTag(value) === '[object Window]'
}

export default isWindow
