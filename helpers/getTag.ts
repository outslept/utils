function getTag(value: unknown): string {
  if (value === null)
    return '[object Null]'
  if (value === undefined)
    return '[object Undefined]'
  return Object.prototype.toString.call(value)
}

export default getTag
