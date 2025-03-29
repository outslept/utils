import getTag from '../../helpers/getTag'

/**
 * Checks if a value is a Map.
 * @param value - Value to check
 * @returns True if value is a Map
 */
function isMap<K = any, V = any>(value: unknown): value is Map<K, V> {
  return getTag(value) === '[object Map]'
}

export default isMap
