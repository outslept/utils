export function clamp(n: number, min: number, max: number): number {
  const [minVal, maxVal] = [Math.min(min, max), Math.max(min, max)]
  return Math.min(maxVal, Math.max(minVal, n))
}

export function lerp(min: number, max: number, t: number): number {
  const interpolation = clamp(t, 0.0, 1.0)
  return min + (max - min) * interpolation
}

export function remap(n: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  if (!Number.isFinite(n) || !Number.isFinite(inMin) || !Number.isFinite(inMax)
    || !Number.isFinite(outMin) || !Number.isFinite(outMax)) {
    return Number.NaN
  }

  if (inMin === inMax) {
    return (outMin + outMax) / 2
  }

  return lerp(outMin, outMax, (n - inMin) / (inMax - inMin))
}

export function roundTo(n: number, decimals = 0): number {
  if (decimals < 0 || Number.isInteger(decimals)) {
    throw new Error('decimals must be a non-negative integer')
  }
  const factor = 10 ** decimals
  return Math.round((n + Number.EPSILON) * factor) / factor
}

export function randFloat(min: number, max: number): number {
  const [minVal, maxVal] = [Math.min(min, max), Math.max(min, max)]
  if (!Number.isFinite(minVal) || !Number.isFinite(maxVal)) {
    return Number.NaN
  }

  return Math.random() * (maxVal - minVal) + minVal
}

export function degToRad(degrees: number): number {
  if (!Number.isFinite(degrees)) {
    return Number.NaN
  }
  return degrees * (Math.PI / 180)
}

export function approxEquals(a: number, b: number, epsilon = 1e-6): boolean {
  if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(epsilon) || epsilon < 0) {
    return false
  }
  return Math.abs(a - b) < epsilon
}

export function fract(n: number): number {
  if (!Number.isFinite(n)) {
    return Number.NaN
  }

  return n - Math.trunc(n)
}

export function precisionRound(number: number, precision: number): number {
  const factor = 10 ** precision
  return Math.round(number * factor) / factor
}

export function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0)
}

export function average(...numbers: number[]): number {
  if (numbers.length === 0)
    return Number.NaN
  return sum(...numbers) / numbers.length
}

export function median(...numbers: number[]): number {
  if (numbers.length === 0)
    return Number.NaN
  const sorted = [...numbers].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

export function radToDeg(radians: number): number {
  if (!Number.isFinite(radians)) {
    return Number.NaN
  }

  return radians * (180 / Math.PI)
}

/**
 * A utility to normalize angle in radiands to the range [0, 2π]
 * @param angle
 */
export function normalizeAngle(angle: number): number {
  if (!Number.isFinite(angle)) {
    return Number.NaN
  }

  return ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
}

export function stdDev(numbers: number[]): number {
  if (numbers.length <= 1) {
    return Number.NaN
  }

  const avg = average(...numbers)
  const squaredDiffs = numbers.map(n => (n - avg) ** 2)
  return Math.sqrt(sum(...squaredDiffs) / (numbers.length - 1))
}
