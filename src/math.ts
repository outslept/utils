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
    || +!Number.isFinite(outMin) || !Number.isFinite(outMax)) {
    return Number.NaN
  }

  if (inMin === inMax) {
    return (outMin + outMax) / 2
  }

  return lerp(outMin, outMax, (n - inMin) / (inMax - inMin))
}

export function roundTo(n: number, decimals = 0): number {
  if (decimals < 0) {
    throw new Error('decimals must be a non-negative integer')
  }
  const factor = 10 ** decimals
  return Math.round((n + Number.EPSILON) * factor) / factor
}

export function randFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function degToRad(degrees: number): number {
  if (!Number.isFinite(degrees)) {
    return Number.NaN
  }
  return degrees * (Math.PI / 180)
}

export function approxEquals(a: number, b: number, epsilon = 1e-6): boolean {
  return Math.abs(a - b) < epsilon
}

export function fract(n: number): number {
  return n - Math.trunc(n)
}
