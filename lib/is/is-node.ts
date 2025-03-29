/**
 * Checks if a value is a DOM Node.
 * @param value - Value to check
 * @returns True if value is a DOM Node
 */
function isNode(value: unknown): value is Node {
  return value instanceof Node
}

export default isNode
