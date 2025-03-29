/**
 * Checks if a value is a prototype object.
 * @param value - Value to check
 * @returns True if value is a prototype
 */
function isPrototype(value: unknown): boolean {
  if (!value || typeof value !== 'object')
    return false

  try {
    // Check if the value has a constructor property that points to a function
    // whose prototype is the value itself
    const constructor = (value as any).constructor
    return typeof constructor === 'function' && constructor.prototype === value
  }
  catch {
    return false
  }
}

export default isPrototype
