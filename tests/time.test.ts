import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  createTimeElapsed,
  formatDuration,
  // sleep,
  timestamp,
  toMilliseconds,
  toSeconds,
} from '../lib/time'

describe('timestamp', () => {
  it('returns the current timestamp in milliseconds', () => {
    const mockNow = 1646735000000 
    vi.spyOn(Date, 'now').mockImplementation(() => mockNow)

    expect(timestamp()).toBe(mockNow)

    vi.restoreAllMocks()
  })
})

describe('toSeconds', () => {
  it('converts milliseconds to seconds', () => {
    expect(toSeconds(1000)).toBe(1)
    expect(toSeconds(1500)).toBe(1)
    expect(toSeconds(2000)).toBe(2)
    expect(toSeconds(0)).toBe(0)
  })
})

describe('toMilliseconds', () => {
  it('converts seconds to milliseconds', () => {
    expect(toMilliseconds(1)).toBe(1000)
    expect(toMilliseconds(0.5)).toBe(500)
    expect(toMilliseconds(0)).toBe(0)
    expect(toMilliseconds(2)).toBe(2000)
  })
})

describe('createTimeElapsed', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('creates a function that measures elapsed time since creation', () => {
    const mockStartTime = 1000
    vi.spyOn(Date, 'now').mockImplementation(() => mockStartTime)

    const getElapsed = createTimeElapsed()

    vi.spyOn(Date, 'now').mockImplementation(() => mockStartTime + 500)
    expect(getElapsed()).toBe(500)

    vi.spyOn(Date, 'now').mockImplementation(() => mockStartTime + 1200)
    expect(getElapsed()).toBe(1200)
  })
})

describe('formatDuration', () => {
  it('formats duration in short format correctly', () => {
    expect(formatDuration(0)).toBe('0s')
    expect(formatDuration(1000)).toBe('1s')
    expect(formatDuration(60000)).toBe('1m')
    expect(formatDuration(3600000)).toBe('1h')
    expect(formatDuration(86400000)).toBe('1d')
    expect(formatDuration(90061000)).toBe('1d 1h 1m 1s')
    expect(formatDuration(3661000)).toBe('1h 1m 1s')
    expect(formatDuration(3600000 + 60000)).toBe('1h 1m')
  })

  it('formats duration in long format correctly', () => {
    expect(formatDuration(0, 'long')).toBe('0s')
    expect(formatDuration(1000, 'long')).toBe('1 second')
    expect(formatDuration(2000, 'long')).toBe('2 seconds')
    expect(formatDuration(60000, 'long')).toBe('1 minute')
    expect(formatDuration(120000, 'long')).toBe('2 minutes')
    expect(formatDuration(3600000, 'long')).toBe('1 hour')
    expect(formatDuration(7200000, 'long')).toBe('2 hours')
    expect(formatDuration(86400000, 'long')).toBe('1 day')
    expect(formatDuration(172800000, 'long')).toBe('2 days')
    expect(formatDuration(90061000, 'long')).toBe('1 day 1 hour 1 minute 1 second')
    expect(formatDuration(93784000, 'long')).toBe('1 day 2 hours 3 minutes 4 seconds')
  })

  it('handles default format parameter correctly', () => {
    expect(formatDuration(90061000)).toBe('1d 1h 1m 1s')
  })
})
