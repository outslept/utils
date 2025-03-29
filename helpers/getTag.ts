const { toString } = Object.prototype

function getTag(value: unknown): string {
  if (value === null)
    return '[object Null]'
  if (value === undefined)
    return '[object Undefined]'
  return toString.call(value)
}

export default getTag
