function pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return arg => fns.reduce((result, fn) => fn(result), arg)
}

function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return arg => fns.reduceRight((result, fn) => fn(result), arg)
}

function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map()
  return ((...args: any[]) => {
    const key = JSON.stringify(args)
    if (cache.has(key))
      return cache.get(key)
    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false
  let result: ReturnType<T>

  return ((...args: Parameters<T>) => {
    if (!called) {
      called = true
      result = fn(...args)
    }
    return result
  }) as T
}

function curry<T extends (...args: any[]) => any>(
  fn: T,
): (...args: Parameters<T>) => ReturnType<T> {
  return function curried(...args: any[]): any {
    if (args.length >= fn.length) {
      return fn(...args)
    }
    return (...nextArgs: any[]) => curried(...args, ...nextArgs)
  }
}

export {
  compose,
  curry,
  memoize,
  once,
  pipe,
}
