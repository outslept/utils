/**
 * Checks if a value is a TypedArray.
 * @param value - Value to check
 * @returns True if value is a TypedArray
 */
function isTypedArray(value: unknown): value is ArrayBufferView {
  return (
    ArrayBuffer.isView(value)
    && !(value instanceof DataView)
  )
}

export default isTypedArray
