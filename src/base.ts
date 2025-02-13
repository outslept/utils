export function assert(condition: boolean, message: string): asserts condition {
  if (!condition)
    throw new Error(message)
}
export const toString = (v: any): string => Object.prototype.toString.call(v)
export function getTypeName(v: any): string {
  if (v === null)
    return 'null'
  const type = toString(v).slice(8, -1).toLowerCase()
  return (typeof v === 'object' || typeof v === 'function') ? type : typeof v
}
export function noop(): void {}
