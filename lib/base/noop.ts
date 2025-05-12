/**
 * No-operation function that does nothing.
 *
 * @example
 * // Using as default callback
 * function fetchData(onComplete = noop) {
 *   // fetch logic...
 *   onComplete();
 * }
 */
export function noop(): void {}
