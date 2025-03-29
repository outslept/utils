/**
 * Checks if a value is a BigInt.
 * @param value - Value to check
 * @returns True if value is a BigInt
 */
function isBigInt(value: unknown): value is bigint {
  return typeof value === 'bigint'
}

export default isBigInt
