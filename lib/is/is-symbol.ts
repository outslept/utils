/**
 * Checks if a value is a symbol.
 * @param value - Value to check
 * @returns True if value is a symbol
 */
function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol'
}

export default isSymbol
