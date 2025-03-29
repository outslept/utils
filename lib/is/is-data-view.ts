import getTag from '../../helpers/getTag'
import isObjectLike from './is-object-like'

/**
 * Checks if a value is a DataView.
 * @param value - Value to check
 * @returns True if value is a DataVie
 */
function isDataView(value: unknown): value is DataView {
  return isObjectLike(value) && getTag(value) === '[object DataView]'
}

export default isDataView
