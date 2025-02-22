import { isArray, isObject } from './is'

export function objectMap<
  K extends PropertyKey,
  V,
  NK extends PropertyKey,
  NV,
>(
  obj: Record<K, V>,
  fn: (key: K, value: V) => [NK, NV] | undefined,
): Record<NK, NV> {
  const entries = Object.entries(obj) as [K, V][]

  const mappedEntries = entries
    .map(([key, value]) => fn(key, value))
    .filter((entry): entry is [NK, NV] => entry !== undefined)

  const keys = new Set(mappedEntries.map(([k]) => k))
  if (keys.size !== mappedEntries.length) {
    throw new Error('Duplicate keys detected in mapped object')
  }

  return mappedEntries.reduce((acc, [key, value]) => {
    acc[key] = value
    return acc
  }, {} as Record<NK, NV>)
}

export function isKeyOf<T extends object>(obj: T, k: keyof any): k is keyof T {
  return k in obj
}

export function objectKeys<T extends object>(obj: T): Array<`${keyof T & (string | number | boolean | null | undefined)}`> {
  return Object.keys(obj) as Array<`${keyof T & (string | number | boolean | null | undefined)}`>
}

export function objectEntries<T extends object>(obj: T): Array<[keyof T, T[keyof T]]> {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>
}

export function isMergeableObject(item: any): item is object {
  return isObject(item) && !Array.isArray(item)
}

export function objectPick<O extends object, T extends keyof O>(obj: O, keys: T[], omitUndefined = false): Pick<O, T> {
  return keys.reduce((n, k) => {
    if (k in obj) {
      if (!omitUndefined || obj[k] !== undefined)
        n[k] = obj[k]
    }
    return n
  }, {} as Pick<O, T>)
}

export function clearUndefined<T extends object>(obj: T): T {
  // @ts-expect-error -- ignore
  Object.keys(obj).forEach((key: string) => (obj[key] === undefined ? delete obj[key] : {}))
  return obj
}

export function hasOwnProperty<T>(obj: T, v: PropertyKey): boolean {
  if (obj == null) {
    return false
  }

  return Object.hasOwn(obj, v)
}

export function deepMerge<T extends object, S extends object>(target: T, source: S): T & S {
  const output = { ...target } as any
  for (const key of Object.keys(source)) {
    const sourceValue = (source as any)[key]
    if (isMergeableObject(sourceValue)) {
      output[key] = key in target && isMergeableObject((target as any)[key])
        ? deepMerge((target as any)[key], sourceValue)
        : sourceValue
    }
    else {
      output[key] = sourceValue
    }
  }
  return output
}

export function deepClone<T>(obj: T): T {
  if (!isObject(obj))
    return obj
  if (isArray(obj))
    return obj.map(deepClone) as T

  const clone = {} as T
  for (const key of Object.keys(obj)) {
    // @ts-expect-error -- ignore (FIX LATER)
    clone[key] = deepClone(obj[key])
  }
  return clone
}
