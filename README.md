# outslept/utils

A personal collection of TypeScript utility functions inspired by antfu/utils. This is a reference implementation for copy-paste use rather than an npm package.

## Overview

This colleciton provides a variety of type-safe, documented utilities to simplify development and reduce boilerplate code.

## Core Modules

### Type Checking (`is.ts`)

Comprehensive type guards for runtime type checking:

```ts
import { isArray, isNumber, isString } from './is'

isString('hello') // true
isNumber(123) // true
isArray([1, 2, 3]) // true
```

### Type Guards (`guards.ts`)

Type guards with TypeScript type narrowing:

```ts
import { isNonEmptyArray, notNullish } from './guards'

const items = [1, null, 2, undefined].filter(notNullish) // [1, 2]

if (isNonEmptyArray(data)) {
  // TypeScript knows data is a non-empty array here
  const first = data[0] // Safe access
}
```

### Object Manipulation (`object.ts`)

Utilities for working with objects:

```ts
import { deepClone, deepMerge, objectPick } from './object'

const cloned = deepClone(complexObject)
const merged = deepMerge({ a: 1 }, { b: 2 }) // { a: 1, b: 2 }
const subset = objectPick(user, ['id', 'name']) // Only these properties
```

### Array Operations (`array.ts`)

Utilities for array manipulation:

```ts
import { chunk, groupBy, uniq } from './array'

const chunks = chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
const grouped = groupBy(users, user => user.role) // { admin: [...], user: [...] }
const unique = uniq([1, 2, 2, 3, 1]) // [1, 2, 3]
```

### String Formatting (`string.ts`)

String manipulation utilities:

```ts
import { camelCase, pluralize, truncate } from './string'

camelCase('hello-world') // 'helloWorld'
truncate('Long text...', 10) // 'Long te...'
pluralize(1, 'item') // '1 item'
pluralize(2, 'item') // '2 items'
```

### Math Operations (`math.ts`)

Mathematical utilities:

```ts
import { clamp, lerp, roundTo } from './math'

clamp(value, 0, 100) // Constrain between 0 and 100
lerp(0, 100, 0.5) // 50 (halfway between)
roundTo(3.14159, 2) // 3.14
```

### Time Utilities (`time.ts`)

Time and duration utilities:

```ts
import { formatDuration, sleep } from './time'

await sleep(1000) // Wait for 1 second
formatDuration(90061000, 'short') // "1d 1h 1m 1s"
formatDuration(90061000, 'long') // "1 day 1 hour 1 minute 1 second"
```

### Async Utilities (`async.ts`)

Utilities for asynchronous stuff:

```ts
import { asyncPool, retry } from './async'

// Retry an operation with exponential backoff
const result = await retry(fetchData, { attempts: 3, delay: 1000 })

// Process items with limited concurrency
const results = await asyncPool(5, urls, url => fetch(url))
```

### Functional (`fp.ts`)

Fp utilities:

```ts
import { compose, memoize, pipe } from './functional'

// Create a pipeline of transformations
const process = pipe(normalize, validate, transform)

// Create a memoized version of an expensive function
const cachedCalculation = memoize(expensiveCalculation)
```

### Base Utilities (`base.ts`)

Fundamental utilities

```ts
import { assert, getTypeName } from './base'

assert(condition, 'Error message if condition is false')
getTypeName(value) // 'string', 'number', 'array', etc.
```

### Type Utilities

The collection includes a set of utility types for common type transformations:

```ts
import type {
  CamelCaseKeys,
  DeepPartial,
  DeepReadonly
} from './types'

type UserInput = DeepPartial<User>
type APIResponse = CamelCaseKeys<ServerResponse>
type ConfigObject = DeepReadonly<Config>
```

## Usage

Simply copy the functions you need directly into your project. Each utility is self-contained with comprehensive JSDoc comments to help you understand its usage.

## License

MIT
