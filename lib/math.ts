/**
 * Constrains a number to be within a specified range.
 *
 * @example
 * clamp(5, 0, 10);    // 5 (within range)
 * clamp(-5, 0, 10);   // 0 (below min)
 * clamp(15, 0, 10);   // 10 (above max)
 * clamp(5, 10, 0);    // 5 (handles reversed min/max)
 *
 * @param n - Number to constrain
 * @param min - Minimum boundary
 * @param max - Maximum boundary
 * @returns The constrained value
 */
function clamp(n: number, min: number, max: number): number {
  const [minVal, maxVal] = [Math.min(min, max), Math.max(min, max)]
  return Math.min(maxVal, Math.max(minVal, n))
}

/**
 * Linearly interpolates between two values based on an interpolation factor.
 *
 * @example
 * lerp(0, 10, 0.5);   // 5 (halfway between 0 and 10)
 * lerp(0, 10, 0);     // 0 (at start)
 * lerp(0, 10, 1);     // 10 (at end)
 * lerp(0, 10, 1.5);   // 10 (clamped to valid range)
 *
 * @param min - Start value
 * @param max - End value
 * @param t - Interpolation factor (0.0 to 1.0, clamped)
 * @returns The interpolated value
 */
function lerp(min: number, max: number, t: number): number {
  const interpolation = clamp(t, 0.0, 1.0)
  return min + (max - min) * interpolation
}

/**
 * Remaps a value from one range to another.
 *
 * @example
 * remap(5, 0, 10, 100, 200);   // 150 (50% between 100 and 200)
 * remap(0, 0, 10, 100, 200);   // 100 (0% between 100 and 200)
 * remap(10, 0, 10, 100, 200);  // 200 (100% between 100 and 200)
 *
 * @param n - Value to remap
 * @param inMin - Input range minimum
 * @param inMax - Input range maximum
 * @param outMin - Output range minimum
 * @param outMax - Output range maximum
 * @returns The remapped value, or NaN for invalid inputs
 */
function remap(n: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  if (!Number.isFinite(n) || !Number.isFinite(inMin) || !Number.isFinite(inMax)
    || !Number.isFinite(outMin) || !Number.isFinite(outMax)) {
    return Number.NaN
  }

  if (inMin === inMax) {
    return (outMin + outMax) / 2
  }

  return lerp(outMin, outMax, (n - inMin) / (inMax - inMin))
}

/**
 * Rounds a number to a specified number of decimal places.
 *
 * @example
 * roundTo(3.14159, 2);   // 3.14
 * roundTo(3.14159, 0);   // 3
 * roundTo(3.14159);      // 3 (default is 0 decimals)
 *
 * @param n - Number to round
 * @param decimals - Number of decimal places (non-negative integer)
 * @returns Rounded number
 * @throws Error if decimals is negative or not an integer
 */
function roundTo(n: number, decimals = 0): number {
  if (decimals < 0 || Number.isInteger(decimals)) {
    throw new Error('decimals must be a non-negative integer')
  }
  const factor = 10 ** decimals
  return Math.round((n + Number.EPSILON) * factor) / factor
}

/**
 * Generates a random floating-point number within a specified range.
 *
 * @example
 * randFloat(0, 10);   // Random number between 0 and 10
 * randFloat(10, 0);   // Handles reversed min/max correctly
 *
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (exclusive)
 * @returns Random floating-point number within the range, or NaN for invalid inputs
 */
function randFloat(min: number, max: number): number {
  const [minVal, maxVal] = [Math.min(min, max), Math.max(min, max)]
  if (!Number.isFinite(minVal) || !Number.isFinite(maxVal)) {
    return Number.NaN
  }

  return Math.random() * (maxVal - minVal) + minVal
}

/**
 * Converts degrees to radians.
 *
 * @example
 * degToRad(180);   // 3.141592653589793 (π)
 * degToRad(360);   // 6.283185307179586 (2π)
 *
 * @param degrees - Angle in degrees
 * @returns Angle in radians, or NaN for invalid input
 */
function degToRad(degrees: number): number {
  if (!Number.isFinite(degrees)) {
    return Number.NaN
  }
  return degrees * (Math.PI / 180)
}

/**
 * Checks if two numbers are approximately equal within a specified epsilon.
 *
 * @example
 * approxEquals(0.1 + 0.2, 0.3);           // true (handles floating point precision issues)
 * approxEquals(0.1, 0.2);                 // false (numbers differ by more than epsilon)
 * approxEquals(0.1, 0.100001, 0.00001);   // true (within custom epsilon)
 *
 * @param a - First number
 * @param b - Second number
 * @param epsilon - Maximum allowed difference (default: 1e-6)
 * @returns True if the numbers are approximately equal
 */
function approxEquals(a: number, b: number, epsilon = 1e-6): boolean {
  if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(epsilon) || epsilon < 0) {
    return false
  }
  return Math.abs(a - b) < epsilon
}

/**
 * Returns the fractional part of a number.
 *
 * @example
 * fract(3.14);    // 0.14
 * fract(-3.14);   // -0.14
 * fract(5);       // 0
 *
 * @param n - Input number
 * @returns Fractional part of the number, or NaN for invalid input
 */
function fract(n: number): number {
  if (!Number.isFinite(n)) {
    return Number.NaN
  }

  return n - Math.trunc(n)
}

/**
 * Rounds a number to a specified precision.
 * Similar to roundTo but with slightly different implementation.
 *
 * @example
 * precisionRound(3.14159, 2);   // 3.14
 * precisionRound(3.14159, 0);   // 3
 *
 * @param number - Number to round
 * @param precision - Number of decimal places
 * @returns Rounded number
 */
function precisionRound(number: number, precision: number): number {
  const factor = 10 ** precision
  return Math.round(number * factor) / factor
}

/**
 * Calculates the sum of a series of numbers.
 *
 * @example
 * sum(1, 2, 3, 4);   // 10
 * sum();             // 0 (empty sum)
 *
 * @param numbers - Numbers to sum
 * @returns Sum of all provided numbers
 */
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0)
}

/**
 * Calculates the arithmetic mean (average) of a series of numbers.
 *
 * @example
 * average(1, 2, 3, 4);   // 2.5
 * average(5);            // 5
 * average();             // NaN (undefined average)
 *
 * @param numbers - Numbers to average
 * @returns Arithmetic mean, or NaN if no numbers provided
 */
function average(...numbers: number[]): number {
  if (numbers.length === 0)
    return Number.NaN
  return sum(...numbers) / numbers.length
}

/**
 * Calculates the median value of a series of numbers.
 *
 * @example
 * median(1, 3, 5);       // 3 (middle value)
 * median(1, 3, 5, 7);    // 4 (average of middle two values)
 * median();              // NaN (undefined median)
 *
 * @param numbers - Numbers to find median of
 * @returns Median value, or NaN if no numbers provided
 */
function median(...numbers: number[]): number {
  if (numbers.length === 0)
    return Number.NaN
  const sorted = [...numbers].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

/**
 * Converts radians to degrees.
 *
 * @example
 * radToDeg(Math.PI);      // 180
 * radToDeg(Math.PI * 2);  // 360
 *
 * @param radians - Angle in radians
 * @returns Angle in degrees, or NaN for invalid input
 */
function radToDeg(radians: number): number {
  if (!Number.isFinite(radians)) {
    return Number.NaN
  }

  return radians * (180 / Math.PI)
}

/**
 * Normalizes an angle in radians to the range [0, 2π).
 *
 * @example
 * normalizeAngle(Math.PI * 3);   // π (equivalent to π)
 * normalizeAngle(-Math.PI);      // π (equivalent to π)
 * normalizeAngle(0);             // 0
 *
 * @param angle - Angle in radians
 * @returns Normalized angle in range [0, 2π), or NaN for invalid input
 */
function normalizeAngle(angle: number): number {
  if (!Number.isFinite(angle)) {
    return Number.NaN
  }

  return ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
}

/**
 * Calculates the standard deviation of a set of numbers.
 *
 * @example
 * stdDev([2, 4, 4, 4, 5, 5, 7, 9]);  // 2 (sample standard deviation)
 * stdDev([1]);                        // NaN (need at least 2 values)
 *
 * @param numbers - Array of numbers
 * @returns Sample standard deviation, or NaN if fewer than 2 numbers provided
 */
function stdDev(numbers: number[]): number {
  if (numbers.length <= 1) {
    return Number.NaN
  }

  const avg = average(...numbers)
  const squaredDiffs = numbers.map(n => (n - avg) ** 2)
  return Math.sqrt(sum(...squaredDiffs) / (numbers.length - 1))
}

/**
 * Calculates the greatest common divisor (GCD) of two numbers.
 *
 * @example
 * gcd(48, 18);    // 6
 * gcd(17, 5);     // 1 (coprime)
 * gcd(-48, 18);   // 6 (handles negative numbers)
 *
 * @param a - First number
 * @param b - Second number
 * @returns Greatest common divisor
 */
function gcd(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) {
    const t = b
    b = a % b
    a = t
  }
  return a
}

/**
 * Calculates the least common multiple (LCM) of two numbers.
 *
 * @example
 * lcm(4, 6);     // 12
 * lcm(21, 6);    // 42
 *
 * @param a - First number
 * @param b - Second number
 * @returns Least common multiple
 */
function lcm(a: number, b: number): number {
  return a * b / gcd(a, b)
}

export {
  approxEquals,
  average,
  degToRad,
  fract,
  gcd,
  lcm,
  lerp,
  median,
  normalizeAngle,
  precisionRound,
  radToDeg,
  randFloat,
  remap,
  roundTo,
  stdDev,
  sum,
}
